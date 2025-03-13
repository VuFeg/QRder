package controllers

import (
	"QRder-be/internal/services"
	"QRder-be/pkg/response"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// CreateTableHandler xử lý request tạo bàn
func CreateTable(c *gin.Context) {
	var input services.TableInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}

	table, err := services.CreateTable(input)
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}

	response.SuccessResponse(c, response.SuccessCreated, table)
}

// GetTableHandler xử lý request lấy thông tin bàn
func GetTable(c *gin.Context) {
	id := c.Param("id")
	table, err := services.GetTable(uuid.MustParse(id))
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}

	response.SuccessResponse(c, response.SuccessOK, table)
}

// GetAllTablesHandler xử lý request lấy thông tin tất cả các bàn
func GetAllTables(c *gin.Context) {
	tables, err := services.GetAllTables()
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}

	response.SuccessResponse(c, response.SuccessOK, tables)
}

// UpdateTableHandler xử lý request cập nhật thông tin bàn
func UpdateTable(c *gin.Context) {
	id := c.Param("id")
	var input services.TableUpdateInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}

	table, err := services.UpdateTable(uuid.MustParse(id), input)
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}

	response.SuccessResponse(c, response.SuccessUpdated, table)
}

// DeleteTableHandler xử lý request xóa bàn
func DeleteTable(c *gin.Context) {
	id := c.Param("id")
	if err := services.DeleteTable(uuid.MustParse(id)); err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}

	response.SuccessResponse(c, response.SuccessDeleted, nil)
}
