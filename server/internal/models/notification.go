package models

import (
	"time"

	"github.com/google/uuid"
)

type Notification struct {
	ID        uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	OrderID   uuid.UUID  `gorm:"type:uuid;not null" json:"order_id"`
	StaffID   *uuid.UUID `gorm:"type:uuid" json:"staff_id"`
	Message   string     `gorm:"type:text;not null" json:"message"`
	IsRead    bool       `gorm:"default:false" json:"is_read"`
	CreatedAt time.Time  `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time  `gorm:"autoUpdateTime" json:"updated_at"`
}
