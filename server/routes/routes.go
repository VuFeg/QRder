package routes

import (
	"github.com/gin-gonic/gin"
)

// SetupRouter khởi tạo và cấu hình các route cho ứng dụng.
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Nhóm route public (Không cần xác thực)
	public := router.Group("/")
	AuthRoutes(public)

	// Nhóm route cần xác thực (private API)
	api := router.Group("/api")
	// api.Use(middleware.AuthMiddleware())

	// Đăng ký từng nhóm route
	MenuRoutes(api)
	TableRoutes(api)
	MediaRoutes(api)
	OrderRoutes(api)

	return router
}
