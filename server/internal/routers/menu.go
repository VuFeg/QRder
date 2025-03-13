package routers

import (
	"QRder-be/internal/controllers"

	"github.com/gin-gonic/gin"
)

// MenuRoutes chứa các route liên quan đến menu.
func MenuRoutes(router *gin.RouterGroup) {
	router.GET("/menu", controllers.GetMenus)
	router.POST("/menu", controllers.CreateMenu)
	router.GET("/menu/:id", controllers.GetMenu)
	router.PUT("/menu/:id", controllers.UpdateMenu)
	router.DELETE("/menu/:id", controllers.DeleteMenu)
}
