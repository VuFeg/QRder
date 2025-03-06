package routes

import (
	"QRder-be/controllers"

	"github.com/gin-gonic/gin"
)

// MediaRoutes chứa các route liên quan đến media.
func MediaRoutes(router *gin.RouterGroup) {
	router.POST("/upload", controllers.UploadImage)
}
