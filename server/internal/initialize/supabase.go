package initialize

import (
	"QRder-be/global"
	"log"

	"github.com/supabase-community/supabase-go"
)

func InitSupabase() {
	client, err := supabase.NewClient(
		global.Config.Database.SupabaseUrl,
		global.Config.Database.SupabaseKey,
		nil,
	)

	if err != nil {
		log.Fatal("Lỗi khởi tạo Supabase client:", err)
		log.Println("Supabase client initialized:", global.SupabaseClient)
	}

	global.SupabaseClient = client
}
