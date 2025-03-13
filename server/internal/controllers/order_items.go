package controllers

import (
	"QRder-be/internal/services"
	"QRder-be/pkg/response"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// CreateOrderItem handles the creation of a new order item.
func CreateOrderItem(c *gin.Context) {
	var input services.OrderItemInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}

	orderItem, err := services.CreateOrderItem(input)
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}

	response.SuccessResponse(c, response.SuccessCreated, orderItem)
}

// GetOrderItem handles retrieving an order item by ID.
func GetOrderItem(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}

	orderItem, err := services.GetOrderItem(id)
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}

	response.SuccessResponse(c, response.SuccessOK, orderItem)
}

// UpdateOrderItem handles updating an order item by ID.
func UpdateOrderItem(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}

	var input services.UpdateOrderItemInput
	if err := c.ShouldBindJSON(&input); err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}

	orderItem, err := services.UpdateOrderItem(id, input)
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}

	response.SuccessResponse(c, response.SuccessUpdated, orderItem)
}

// DeleteOrderItem handles deleting an order item by ID.
func DeleteOrderItem(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}

	if err := services.DeleteOrderItem(id); err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}

	response.SuccessResponse(c, response.SuccessDeleted, nil)
}
