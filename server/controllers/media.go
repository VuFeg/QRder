package controllers

import (
	"QRder-be/configs"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UploadImage(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error message": "No image uploaded"})
		return
	}

	stor, err := configs.GetStorage()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error message": "Failed to get storage client"})
		return
	}

	url, err := stor.UploadFile(file)
	fmt.Println("url:", url)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error message": "Failed to upload image"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"url": url})
}

func DeleteImage(c *gin.Context) {
	type DeleteImageRequest struct {
		Filename string `json:"filename" binding:"required"`
	}

	var req DeleteImageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request", "details": err.Error()})
		return
	}

	if err := DeleteImageWithContext(c, req.Filename); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete image", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Image deleted successfully"})
}

// DeleteImageWithContext: Hàm trợ giúp để gọi từ service
func DeleteImageWithContext(ctx *gin.Context, filename string) error {
	stor, err := configs.GetStorage()
	if err != nil {
		return err
	}
	return stor.DeleteFile(filename)
}