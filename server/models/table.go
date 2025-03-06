package models

import (
	"time"

	"github.com/google/uuid"
)

type Table struct {
	ID          uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	TableNumber string     `gorm:"type:varchar(10);unique;not null" json:"table_number"`
	Status      string     `gorm:"type:varchar(20);default:'active'" json:"status"`
	CreatedAt   time.Time  `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time  `gorm:"autoUpdateTime" json:"updated_at"`
}
