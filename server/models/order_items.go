package models

import (
	"time"

	"github.com/google/uuid"
)

// OrderItem represents an item in an order.
type OrderItem struct {
    ID        uuid.UUID `json:"id"`
    OrderID   uuid.UUID `json:"order_id"`
    MenuID    uuid.UUID `json:"menu_id"`
    Quantity  int       `json:"quantity"`
    Price     float64   `json:"price"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
    Menu      Menu      `json:"menu" gorm:"foreignKey:MenuID"`
}