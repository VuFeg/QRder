package routers

import (
	"QRder-be/internal/controllers"

	"github.com/gin-gonic/gin"
)

// OrderRoutes chứa các route liên quan đến đơn hàng.
func OrderItemsRoutes(router *gin.RouterGroup) {
	router.POST("/order_items", controllers.CreateOrderItem)
	router.GET("/order_items/:id", controllers.GetOrderItem)
	router.PUT("/order_items/:id", controllers.UpdateOrderItem)
	router.DELETE("/order_items/:id", controllers.DeleteOrderItem)
}
