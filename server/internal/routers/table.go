package routers

import (
	"QRder-be/internal/controllers"

	"github.com/gin-gonic/gin"
)

// TableRoutes chứa các route liên quan đến bàn ăn.
func TableRoutes(router *gin.RouterGroup) {
	router.POST("/table", controllers.CreateTable)
	router.GET("/table/:id", controllers.GetTable)
	router.GET("/tables", controllers.GetAllTables)
	router.PUT("/table/:id", controllers.UpdateTable)
	router.DELETE("/table/:id", controllers.DeleteTable)
}
