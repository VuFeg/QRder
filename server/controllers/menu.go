package controllers

import (
	"QRder-be/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetMenus xử lý API GET /api/menu
func GetMenus(c *gin.Context) {
    menus, err := services.GetMenus()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, menus)
}

// CreateMenu xử lý API POST /api/menu
func CreateMenu(c *gin.Context) {
    var menuInput services.MenuInput
    fmt.Println(menuInput)
    if err := c.ShouldBindJSON(&menuInput); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    fmt.Println(menuInput)
    newMenu, err := services.CreateMenu(menuInput)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, newMenu)
}

// GetMenu xử lý API GET /api/menu/:id
func GetMenu(c *gin.Context) {
    id := c.Param("id")
    menu, err := services.GetMenu(uuid.MustParse(id))
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, menu)
}

// UpdateMenu xử lý API PUT /api/menu/:id
func UpdateMenu(c *gin.Context) {
    id := c.Param("id")
    var menuInput services.MenuInput
    if err := c.ShouldBindJSON(&menuInput); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    updatedMenu, err := services.UpdateMenu(uuid.MustParse(id), menuInput)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, updatedMenu)
}

// DeleteMenu xử lý API DELETE /api/menu/:id
func DeleteMenu(c *gin.Context) {
    id := c.Param("id")
    if err := services.DeleteMenu(uuid.MustParse(id)); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Menu deleted successfully"})
}