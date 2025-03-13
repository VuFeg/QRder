package initialize

import (
	"QRder-be/global"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// InitDB initializes the database connection.
func InitDB() {
	dsn := global.Config.Database.DbUrl
	if dsn == "" {
		log.Fatal("DSN không được để trống")
	}

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true, // disables implicit prepared statement usage
	}), &gorm.Config{})
	if err != nil {
		log.Fatal("Không thể kết nối đến database: ", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Không thể lấy database instance: ", err)
	}

	if err := sqlDB.Ping(); err != nil {
		log.Fatal("Không thể ping database: ", err)
	}

	global.Db = db
	log.Println("Database connection initialized successfully")
}

// CloseDB closes the database connection.
func CloseDB() {
	sqlDB, err := global.Db.DB()
	if err != nil {
		log.Fatal("Không thể lấy database instance: ", err)
	}
	sqlDB.Close()
}
