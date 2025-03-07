package api

import (
	"QRder-be/configs"
	"QRder-be/routes"
	"net/http"
)

var router http.Handler

func init() {
    // Load biến môi trường từ file .env
    configs.LoadEnv()

    // Kết nối đến PostgreSQL
    configs.ConnectDB()

    // Khởi tạo router và các route
    router = routes.SetupRouter()
}

func Handler(w http.ResponseWriter, r *http.Request) {
    router.ServeHTTP(w, r)
}