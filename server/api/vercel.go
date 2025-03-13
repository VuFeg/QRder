package api

import (
	"QRder-be/internal/routers"
	"net/http"
)

var router http.Handler

func init() {
	// Load biến môi trường từ file .env
	// configs.LoadEnv()

	// Kết nối đến PostgreSQL
	// configs.ConnectDB()

	// Khởi tạo router và các route
	router = routers.SetupRouter()
}

func Handler(w http.ResponseWriter, r *http.Request) {
	router.ServeHTTP(w, r)
}
