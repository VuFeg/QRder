package models

import (
	"time"

	"github.com/google/uuid"
)

type Staff struct {
	ID        uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Username  string     `gorm:"type:varchar(50);unique;not null" json:"username"`
	Password  string     `gorm:"type:varchar(255);not null" json:"password"`
	Role      string     `gorm:"type:varchar(20);default:'staff'" json:"role"`
	CreatedAt time.Time  `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time  `gorm:"autoUpdateTime" json:"updated_at"`
}
