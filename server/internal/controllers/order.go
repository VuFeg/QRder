package controllers

import (
	"QRder-be/internal/services"
	"QRder-be/pkg/response"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetOrders xử lý API GET /api/orders
func GetOrders(c *gin.Context) {
	orders, err := services.GetAllOrders()
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	response.SuccessResponse(c, response.SuccessOK, orders)
}

// CreateOrder xử lý API POST /api/orders
func CreateOrder(c *gin.Context) {
	var orderInput services.OrderInput
	if err := c.ShouldBindJSON(&orderInput); err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}
	newOrder, err := services.CreateOrder(orderInput)
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	// Ensure order items are populated
	populatedOrder, err := services.GetOrder(newOrder.ID)
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	response.SuccessResponse(c, response.SuccessCreated, populatedOrder)
}

// GetOrder xử lý API GET /api/orders/:id
func GetOrder(c *gin.Context) {
	id := c.Param("id")
	order, err := services.GetOrder(uuid.MustParse(id))
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	response.SuccessResponse(c, response.SuccessOK, order)
}

// UpdateOrder xử lý API PUT /api/orders/:id
func UpdateOrder(c *gin.Context) {
	id := c.Param("id")
	var orderInput services.OrderInput
	if err := c.ShouldBindJSON(&orderInput); err != nil {
		response.ErrorResponse(c, response.ErrorBadRequest)
		return
	}
	updatedOrder, err := services.UpdateOrder(uuid.MustParse(id), orderInput)
	if err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	response.SuccessResponse(c, response.SuccessUpdated, updatedOrder)
}

// DeleteOrder xử lý API DELETE /api/orders/:id
func DeleteOrder(c *gin.Context) {
	id := c.Param("id")
	if err := services.DeleteOrder(uuid.MustParse(id)); err != nil {
		response.ErrorResponse(c, response.ErrorInternalServerError)
		return
	}
	response.SuccessResponse(c, response.SuccessDeleted, nil)
}
