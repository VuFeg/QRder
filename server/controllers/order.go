package controllers

import (
	"QRder-be/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetOrders xử lý API GET /api/orders
func GetOrders(c *gin.Context) {
    orders, err := services.GetAllOrders()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, orders)
}

// CreateOrder xử lý API POST /api/orders
func CreateOrder(c *gin.Context) {
    var orderInput services.OrderInput
    if err := c.ShouldBindJSON(&orderInput); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    newOrder, err := services.CreateOrder(orderInput)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    // Ensure order items are populated
    populatedOrder, err := services.GetOrder(newOrder.ID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, populatedOrder)
}

// GetOrder xử lý API GET /api/orders/:id
func GetOrder(c *gin.Context) {
    id := c.Param("id")
    order, err := services.GetOrder(uuid.MustParse(id))
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, order)
}

// UpdateOrder xử lý API PUT /api/orders/:id
func UpdateOrder(c *gin.Context) {
    id := c.Param("id")
    var orderInput services.OrderInput
    if err := c.ShouldBindJSON(&orderInput); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    updatedOrder, err := services.UpdateOrder(uuid.MustParse(id), orderInput)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, updatedOrder)
}

// DeleteOrder xử lý API DELETE /api/orders/:id
func DeleteOrder(c *gin.Context) {
    id := c.Param("id")
    if err := services.DeleteOrder(uuid.MustParse(id)); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Order deleted successfully"})
}