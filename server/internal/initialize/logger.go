package initialize

import (
	"QRder-be/global"
	"QRder-be/pkg/logger"
)

func InitLogger() {
	global.Logger = logger.NewLogger(global.Config.Logger)
}
