package main

import (
	"log"
	"os"
	"qrder/config"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	// Tải file .env
	err := godotenv.Load()
	if err != nil {
		log.Println("Không tìm thấy file .env, dùng biến môi trường hệ thống nếu có")
	}

	// Khởi tạo database
	config.InitDB()
	defer config.CloseDB()

	// Khởi tạo Supabase client
	config.InitSupabase()

	// Khởi tạo Fiber
	app := fiber.New()

	// Route kiểm tra
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("QRder Backend đang chạy!")
	})

	// Lấy port từ .env
	port := os.Getenv("PORT")
	if port == "" {
		port = ":3000"
	}

	log.Fatal(app.Listen(port))
}