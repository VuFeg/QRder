package repo

import (
	"QRder-be/internal/models"

	"github.com/google/uuid"
)

type TableInput struct {
	TableNumber string     `json:"table_number" binding:"required"`
	Capacity    string     `json:"capacity" binding:"required"`
	OrderID     *uuid.UUID `json:"order_id"` // Optional: nếu bàn đã có order mở
}

type ITableRepo interface {
	CreateTable(input TableInput) (*models.Table, error)
}

type tableRepo struct{}

// CreateTable implements ITableRepo.
func (t *tableRepo) CreateTable(input TableInput) (*models.Table, error) {
	return nil, nil
}

func NewTableRepo() ITableRepo {
	return &tableRepo{}
}
