package controllers

import (
	"QRder-be/internal/services"
	"QRder-be/pkg/response"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetMenus xử lý API GET /api/menu
func GetMenus(c *gin.Context) {
	menus, err := services.GetMenus()
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	response.SuccessResponse(c, response.SuccessOK, menus)
}

// CreateMenu xử lý API POST /api/menu
func CreateMenu(c *gin.Context) {
	var menuInput services.MenuInput
	fmt.Println(menuInput)
	if err := c.ShouldBindJSON(&menuInput); err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}
	fmt.Println(menuInput)
	newMenu, err := services.CreateMenu(menuInput)
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	response.SuccessResponse(c, response.SuccessCreated, newMenu)
}

// GetMenu xử lý API GET /api/menu/:id
func GetMenu(c *gin.Context) {
	id := c.Param("id")
	menu, err := services.GetMenu(uuid.MustParse(id))
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	response.SuccessResponse(c, response.SuccessOK, menu)
}

// UpdateMenu xử lý API PUT /api/menu/:id
func UpdateMenu(c *gin.Context) {
	id := c.Param("id")
	var menuInput services.MenuInput
	if err := c.ShouldBindJSON(&menuInput); err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}
	updatedMenu, err := services.UpdateMenu(uuid.MustParse(id), menuInput)
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	response.SuccessResponse(c, response.SuccessOK, updatedMenu)
}

// DeleteMenu xử lý API DELETE /api/menu/:id
func DeleteMenu(c *gin.Context) {
	id := c.Param("id")
	if err := services.DeleteMenu(uuid.MustParse(id)); err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	response.SuccessResponse(c, response.SuccessOK, nil)
}
