package server

import (
	"QRder-be/internal/initialize"
)

func Server() {
	initialize.LoadConfig()
	initialize.InitLogger()
	initialize.InitDB()
	defer initialize.CloseDB()
	initialize.InitSupabase()

	r := initialize.InitRouter()
	r.Run(":8080")
}
