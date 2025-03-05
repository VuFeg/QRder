package config

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func InitDB() {
	connStr := os.Getenv("DB_URL")
	if connStr == "" {
		log.Fatal("DB_URL không được thiết lập trong .env")
	}

	var err error
	DB, err = pgxpool.New(context.Background(), connStr)
	if err != nil {
		log.Fatal("Không thể kết nối Supabase:", err)
	}

	err = DB.Ping(context.Background())
	if err != nil {
		log.Fatal("Không thể ping Supabase:", err)
	}
	log.Println("Kết nối Supabase thành công!")
}

func CloseDB() {
	if DB != nil {
		DB.Close()
	}
}