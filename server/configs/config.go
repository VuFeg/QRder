package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// ConnectDB kết nối đến PostgreSQL sử dụng DSN lấy từ biến môi trường.
func ConnectDB() {
    dsn := os.Getenv("DB_URL")
    if dsn == "" {
        log.Fatal("DSN không được để trống")
    }
    
    db, err := gorm.Open(postgres.New(postgres.Config{
        DSN: dsn,
        PreferSimpleProtocol: true, // disables implicit prepared statement usage
    }), &gorm.Config{})
    if err != nil {
        log.Fatal("Không thể kết nối đến database: ", err)
    }
    
    _, err = db.DB()
    if err != nil {
        log.Fatal("Không thể lấy database instance: ", err)
    }

    DB = db
}

// CloseDB closes the database connection
func CloseDB() {
    sqlDB, err := DB.DB()
    if err != nil {
        log.Fatal("Không thể lấy database instance: ", err)
    }
    sqlDB.Close()
}

func LoadEnv() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file: ", err)
    }
}

func GetEnv(key string) string {
    return os.Getenv(key)
}