package models

import (
	"time"

	"github.com/google/uuid"
)

type OrderItem struct {
	ID        uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	OrderID   uuid.UUID  `gorm:"type:uuid;not null" json:"order_id"`
	MenuID    *uuid.UUID `gorm:"type:uuid" json:"menu_id"`
	Quantity  int        `gorm:"not null;check:quantity > 0" json:"quantity"`
	Price     float64    `gorm:"type:decimal(10,2);not null" json:"price"`
	CreatedAt time.Time  `gorm:"autoCreateTime" json:"created_at"`
}
