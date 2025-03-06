package main

import (
	"QRder-be/configs"
	"QRder-be/routes"
	"os"
)

func main() {
	// Load biến môi trường từ file .env
	configs.LoadEnv()
	
	// Kết nối đến PostgreSQL
	configs.ConnectDB()
	defer configs.CloseDB()

	// Auto migrate các bảng
    // err := configs.DB.AutoMigrate(
    //     &models.Table{},
    //     &models.Menu{},
    //     &models.Staff{},
    //     &models.Order{},
    //     &models.OrderItem{},
    //     &models.Notification{},
    // )
    // if err != nil {
    //     log.Fatal("Không thể migrate database: ", err)
    // }

	// Khởi tạo router và các route
	router := routes.SetupRouter()
	port := os.Getenv("PORT")
	if port == "" {
		port = ":8080"
	}

	// Chạy server tại cổng 8080
	router.Run(port)
}
