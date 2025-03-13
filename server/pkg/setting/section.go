package setting

type Config struct {
	Server   ServerSetting   `mapstructure:"server"`
	Database DatabaseSetting `mapstructure:"db"`
	Logger   LoggerSetting   `mapstructure:"logger"`
	JWT      JWTSetting      `mapstructure:"jwt"`
}

type ServerSetting struct {
	Port int    `mapstructure:"port"`
	Mode string `mapstructure:"mode"`
}

type DatabaseSetting struct {
	DbUrl              string `mapstructure:"db_url"`
	SupabaseUrl        string `mapstructure:"supabase_url"`
	SupabaseKey        string `mapstructure:"supabase_key"`
	SupabaseServiceKey string `mapstructure:"supabase_service_key"`
	SuapabaseBucket    string `mapstructure:"supabase_bucket"`
}

type LoggerSetting struct {
	Level      string `mapstructure:"level"`
	FileName   string `mapstructure:"file_name"`
	MaxSize    int    `mapstructure:"max_size"`
	MaxBackups int    `mapstructure:"max_backups"`
	MaxAge     int    `mapstructure:"max_age"`
	Compress   bool   `mapstructure:"compress"`
}

type JWTSetting struct {
	Secret string `mapstructure:"secret"`
}
