package models

import (
	"time"

	"github.com/google/uuid"
)

type Menu struct {
    ID          uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
    Name        string     `gorm:"type:varchar(100);not null" json:"name"`
    Price       float64    `gorm:"type:decimal(10,2);not null" json:"price"`
    Category    string     `gorm:"type:varchar(50)" json:"category"`
    Available   bool       `gorm:"default:true" json:"available"`
    Description string     `gorm:"type:text" json:"description"`
    ImageURL    string     `gorm:"type:text" json:"image_url"`
    CreatedAt   time.Time  `gorm:"autoCreateTime" json:"created_at"`
    UpdatedAt   time.Time  `gorm:"autoUpdateTime" json:"updated_at"`
}