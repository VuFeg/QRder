package initialize

import (
	"QRder-be/global"
	"QRder-be/internal/middleware"
	"QRder-be/internal/routers"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	var r *gin.Engine

	if global.Config.Server.Mode == "dev" {
		gin.SetMode(gin.DebugMode)
		gin.ForceConsoleColor()
		r = gin.Default()
	} else {
		gin.SetMode(gin.ReleaseMode)
		r = gin.New()
	}

	r.Use(middleware.CORSMiddleware())

	// Nhóm route public (Không cần xác thực)
	public := r.Group("/api")
	routers.AuthRoutes(public)

	// Nhóm route cần xác thực (private API)
	api := r.Group("/api/admin")
	// api.Use(middleware.AuthMiddleware())

	// Đăng ký từng nhóm route
	routers.MenuRoutes(api)
	routers.TableRoutes(api)
	routers.MediaRoutes(api)
	routers.OrderRoutes(api)
	routers.OrderItemsRoutes(api)

	return r
}
