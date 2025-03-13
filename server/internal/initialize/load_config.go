package initialize

import (
	"QRder-be/global"
	"fmt"

	"github.com/spf13/viper"
)

func LoadConfig() {
	viper := viper.New()
	viper.AddConfigPath("./config/")
	viper.SetConfigName("local")
	viper.SetConfigType("yaml")

	// read configuration
	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("failed to read configuration: %w", err))
	}

	// configure struct
	if err := viper.Unmarshal(&global.Config); err != nil {
		fmt.Println("Unable to decode configuration: %w", err)
	}
}
