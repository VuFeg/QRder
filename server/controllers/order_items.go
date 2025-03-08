package controllers

import (
	"QRder-be/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// CreateOrderItem handles the creation of a new order item.
func CreateOrderItem(c *gin.Context) {
    var input services.OrderItemInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    orderItem, err := services.CreateOrderItem(input)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, orderItem)
}

// GetOrderItem handles retrieving an order item by ID.
func GetOrderItem(c *gin.Context) {
    id, err := uuid.Parse(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    orderItem, err := services.GetOrderItem(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Order item not found"})
        return
    }

    c.JSON(http.StatusOK, orderItem)
}

// UpdateOrderItem handles updating an order item by ID.
func UpdateOrderItem(c *gin.Context) {
    id, err := uuid.Parse(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var input services.UpdateOrderItemInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    orderItem, err := services.UpdateOrderItem(id, input)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, orderItem)
}

// DeleteOrderItem handles deleting an order item by ID.
func DeleteOrderItem(c *gin.Context) {
    id, err := uuid.Parse(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    if err := services.DeleteOrderItem(id); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Order item deleted"})
}