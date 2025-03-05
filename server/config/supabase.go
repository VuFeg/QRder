package config

import (
	"log"
	"os"

	"github.com/supabase-community/supabase-go"
)

var Supabase *supabase.Client

// InitSupabase khởi tạo client Supabase
func InitSupabase() {
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_KEY")
	if supabaseURL == "" || supabaseKey == "" {
		log.Fatal("SUPABASE_URL hoặc SUPABASE_KEY không được thiết lập trong .env")
	}

	client, err := supabase.NewClient(supabaseURL, supabaseKey, nil)
	if err != nil {
		log.Fatal("Không thể khởi tạo Supabase client:", err)
	}

	Supabase = client
	log.Println("Khởi tạo Supabase client thành công!")
}