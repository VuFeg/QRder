package models

import (
	"time"

	"github.com/google/uuid"
)

type Table struct {
	ID          uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	TableNumber string     `gorm:"type:varchar(10);unique;not null" json:"table_number"`
	Status      string     `gorm:"type:varchar(20);default:'active'" json:"status"`
	OrderID     *uuid.UUID `gorm:"type:uuid" json:"order_id"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}
