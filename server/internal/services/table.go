package services

import (
	"QRder-be/global"
	"QRder-be/internal/models"
	"time"

	"github.com/google/uuid"
)

// TableInput chứa thông tin đầu vào khi tạo bàn, bao gồm OrderID nếu có
type TableInput struct {
	TableNumber string     `json:"table_number" binding:"required"`
	Capacity    string     `json:"capacity" binding:"required"`
	OrderID     *uuid.UUID `json:"order_id"` // Optional: nếu bàn đã có order mở
}

// TableUpdateInput chứa thông tin cập nhật bàn, có thể cập nhật OrderID (để gán hoặc xóa)
type TableUpdateInput struct {
	TableNumber string     `json:"table_number"`
	Capacity    string     `json:"capacity"`
	OrderID     *uuid.UUID `json:"order_id"` // Optional: truyền giá trị null nếu muốn xóa order_id
}

// CreateTable xử lý logic tạo bàn mới
func CreateTable(input TableInput) (*models.Table, error) {
	// Tạo object Table với dữ liệu đầu vào, bao gồm cả OrderID (nếu có)
	table := &models.Table{
		ID:          uuid.New(),
		TableNumber: input.TableNumber,
		OrderID:     input.OrderID,
		Capacity:    input.Capacity,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	// Lưu vào database
	if result := global.Db.Create(&table); result.Error != nil {
		return nil, result.Error
	}

	return table, nil
}

// GetTable xử lý logic lấy thông tin bàn theo id
func GetTable(id uuid.UUID) (*models.Table, error) {
	var table models.Table
	if result := global.Db.Preload("Order.OrderItems.Menu").First(&table, "id = ?", id); result.Error != nil {
		return nil, result.Error
	}

	return &table, nil
}

// GetAllTables xử lý logic lấy thông tin tất cả các bàn
func GetAllTables() ([]models.Table, error) {
	var tables []models.Table
	if result := global.Db.Preload("Order.OrderItems.Menu").Find(&tables); result.Error != nil {
		return nil, result.Error
	}
	return tables, nil
}

// UpdateTable xử lý logic cập nhật thông tin bàn
func UpdateTable(id uuid.UUID, input TableUpdateInput) (*models.Table, error) {
	var table models.Table
	if result := global.Db.First(&table, "id = ?", id); result.Error != nil {
		return nil, result.Error
	}

	// Cập nhật thông tin nếu có dữ liệu đầu vào
	if input.TableNumber != "" {
		table.TableNumber = input.TableNumber
	}
	if input.Capacity != "" {
		table.Capacity = input.Capacity
	}
	// Cập nhật OrderID (có thể là nil để xóa order_id)
	table.OrderID = input.OrderID

	table.UpdatedAt = time.Now()

	if result := global.Db.Save(&table); result.Error != nil {
		return nil, result.Error
	}

	return &table, nil
}

// DeleteTable xử lý logic xóa bàn
func DeleteTable(id uuid.UUID) error {
	var table models.Table
	if result := global.Db.First(&table, "id = ?", id); result.Error != nil {
		return result.Error
	}

	if result := global.Db.Delete(&table); result.Error != nil {
		return result.Error
	}

	return nil
}
