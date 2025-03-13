package routers

import (
	"QRder-be/internal/controllers"
	"QRder-be/internal/middleware"

	"github.com/gin-gonic/gin"
)

// AuthRoutes chứa các route liên quan đến xác thực người dùng.
func AuthRoutes(router *gin.RouterGroup) {
	router.POST("/login", controllers.Login)
	router.POST("/register", middleware.AuthMiddleware(), controllers.Register)
}
