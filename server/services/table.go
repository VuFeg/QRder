package services

import (
	"QRder-be/configs"
	"QRder-be/models"
	"os"
	"path/filepath"
	"time"

	"github.com/google/uuid"
	"github.com/skip2/go-qrcode"
)

// TableInput chứa thông tin đầu vào khi tạo bàn
type TableInput struct {
    TableNumber string `json:"table_number" binding:"required"`
}

// CreateTable xử lý logic tạo bàn mới
func CreateTable(input TableInput) (*models.Table, error) {
    // Tạo URL QR code
    qrUrl := configs.GetEnv("FRONTEND_URL") + input.TableNumber

    // Tạo tên file QR
    fileName := "qrcode_" + input.TableNumber + ".png"
    filePath := filepath.Join("static", "qrcodes", fileName)

    // Tạo thư mục nếu chưa tồn tại
    if err := os.MkdirAll(filepath.Dir(filePath), os.ModePerm); err != nil {
        return nil, err
    }

    // Sinh file QR code
    if err := qrcode.WriteFile(qrUrl, qrcode.Medium, 256, filePath); err != nil {
        return nil, err
    }

    // Tạo object Table
    table := &models.Table{
        ID:          uuid.New(),
        TableNumber: input.TableNumber,
        QRCodeURL:   qrUrl,
        QRCodePath:  filePath,
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
func UpdateTable(id uuid.UUID, input TableInput) (*models.Table, error) {
    var table models.Table
    if result := configs.DB.First(&table, "id = ?", id); result.Error != nil {
        return nil, result.Error
    }

    table.TableNumber = input.TableNumber
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

    // Xóa file QR code
    if err := os.Remove(table.QRCodePath); err != nil {
        return err
    }

    if result := configs.DB.Delete(&table); result.Error != nil {
        return result.Error
    }

    return nil
}