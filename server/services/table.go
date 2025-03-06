package services

import (
	"QRder-be/configs"
	"QRder-be/models"
	"time"

	"github.com/google/uuid"
)

// TableInput chứa thông tin đầu vào khi tạo bàn
type TableInput struct {
    TableNumber string `json:"table_number" binding:"required"`
}

type TableUpdateInput struct {
    TableNumber string `json:"table_number"`
    Status      string `json:"status"`
}

// CreateTable xử lý logic tạo bàn mới
func CreateTable(input TableInput) (*models.Table, error) {

    // Tạo object Table
    table := &models.Table{
        ID:          uuid.New(),
        TableNumber: input.TableNumber,
        CreatedAt:   time.Now(),
        UpdatedAt:   time.Now(),
    }

    // Lưu vào database
    if result := configs.DB.Create(&table); result.Error != nil {
        return nil, result.Error
    }

    return table, nil
}

// GetTable xử lý logic lấy thông tin bàn
func GetTable(id uuid.UUID) (*models.Table, error) {
    var table models.Table
    if result := configs.DB.First(&table, "id = ?", id); result.Error != nil {
        return nil, result.Error
    }
    return &table, nil
}

// GetAllTables xử lý logic lấy thông tin tất cả các bàn
func GetAllTables() ([]models.Table, error) {
    var tables []models.Table
    if result := configs.DB.Find(&tables); result.Error != nil {
        return nil, result.Error
    }
    return tables, nil
}

// UpdateTable xử lý logic cập nhật thông tin bàn
func UpdateTable(id uuid.UUID, input TableUpdateInput) (*models.Table, error) {
    var table models.Table
    if result := configs.DB.First(&table, "id = ?", id); result.Error != nil {
        return nil, result.Error
    }

    table.TableNumber = input.TableNumber
    table.Status = input.Status
    table.UpdatedAt = time.Now()

    if result := configs.DB.Save(&table); result.Error != nil {
        return nil, result.Error
    }

    return &table, nil
}

// DeleteTable xử lý logic xóa bàn
func DeleteTable(id uuid.UUID) error {
    var table models.Table
    if result := configs.DB.First(&table, "id = ?", id); result.Error != nil {
        return result.Error
    }

    if result := configs.DB.Delete(&table); result.Error != nil {
        return result.Error
    }

    return nil
}