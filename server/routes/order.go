package routes

import (
	"QRder-be/controllers"

	"github.com/gin-gonic/gin"
)

// OrderRoutes chứa các route liên quan đến đơn hàng.
func OrderRoutes(router *gin.RouterGroup) {
    router.GET("/orders", controllers.GetOrders)
    router.POST("/orders", controllers.CreateOrder)
    router.GET("/orders/:id", controllers.GetOrder)
    router.PUT("/orders/:id", controllers.UpdateOrder)
    router.DELETE("/orders/:id", controllers.DeleteOrder)
}