package models

import (
	"time"

	"github.com/google/uuid"
)

// Order đại diện cho bảng 'orders' trong cơ sở dữ liệu.
type Order struct {
    ID            uuid.UUID    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
    TotalAmount   float64      `gorm:"default:0.00" json:"total_amount"`
    Status        string       `gorm:"default:'pending'" json:"status"`
    PaymentMethod string       `json:"payment_method"`
	Note          string    `gorm:"type:varchar(500)" json:"note"`
    CreatedAt     time.Time    `json:"created_at"`
    UpdatedAt     time.Time    `json:"updated_at"`
    OrderItems    []OrderItem  `gorm:"foreignKey:OrderID" json:"order_items"`
}