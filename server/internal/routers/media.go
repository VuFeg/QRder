package routers

import (
	"QRder-be/internal/controllers"

	"github.com/gin-gonic/gin"
)

// MediaRoutes chứa các route liên quan đến media.
func MediaRoutes(router *gin.RouterGroup) {
	router.POST("/media/upload", controllers.UploadImage)
	router.DELETE("/media", controllers.DeleteImage)
}
