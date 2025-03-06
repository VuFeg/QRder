package controllers

import (
	"QRder-be/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// CreateTableHandler xử lý request tạo bàn
func CreateTable(c *gin.Context) {
    var input services.TableInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    table, err := services.CreateTable(input)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, table)
}

// GetTableHandler xử lý request lấy thông tin bàn
func GetTable(c *gin.Context) {
    id := c.Param("id")
    table, err := services.GetTable(uuid.MustParse(id))
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, table)
}

// GetAllTablesHandler xử lý request lấy thông tin tất cả các bàn
func GetAllTables(c *gin.Context) {
    tables, err := services.GetAllTables()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, tables)
}

// UpdateTableHandler xử lý request cập nhật thông tin bàn
func UpdateTable(c *gin.Context) {
    id := c.Param("id")
    var input services.TableInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    table, err := services.UpdateTable(uuid.MustParse(id), input)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, table)
}

// DeleteTableHandler xử lý request xóa bàn
func DeleteTable(c *gin.Context) {
    id := c.Param("id")
    if err := services.DeleteTable(uuid.MustParse(id)); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Table deleted successfully"})
}