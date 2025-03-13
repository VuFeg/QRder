package models

import (
	"time"

	"github.com/google/uuid"
)

type Table struct {
    ID          uuid.UUID  `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
    TableNumber string     `json:"table_number"`
    Capacity    string     `json:"capacity"`
    OrderID     *uuid.UUID `gorm:"type:uuid" json:"order_id"`
    Order       *Order     `gorm:"foreignKey:OrderID" json:"order,omitempty"`
    CreatedAt   time.Time  `json:"created_at"`
    UpdatedAt   time.Time  `json:"updated_at"`
}