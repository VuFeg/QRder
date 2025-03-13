package global

import (
	"QRder-be/pkg/logger"
	"QRder-be/pkg/setting"

	"github.com/supabase-community/supabase-go"
	"gorm.io/gorm"
)

var (
	Config         setting.Config
	Db             *gorm.DB
	SupabaseClient *supabase.Client
	Logger         *logger.LoggerZap
)
