package services

import (
	"QRder-be/global"
	"QRder-be/internal/models"
	"time"

	"github.com/google/uuid"
)

// MenuInput dùng để nhận dữ liệu khi tạo món ăn mới
type MenuInput struct {
	NameVi      string  `json:"name_vi" binding:"required"`
	NameEn      string  `json:"name_en" binding:"required"`
	Price       float64 `json:"price" binding:"required"`
	Category    string  `json:"category"`
	Available   bool    `json:"available"`
	Description string  `json:"description"`
	ImageURL    string  `json:"image_url"`
}

// GetMenus lấy danh sách các món ăn
func GetMenus() ([]models.Menu, error) {
	var menus []models.Menu
	result := global.Db.Find(&menus)
	return menus, result.Error
}

// CreateMenu tạo món ăn mới
func CreateMenu(input MenuInput) (models.Menu, error) {
	menu := models.Menu{
		NameVi:      input.NameVi,
		NameEn:      input.NameEn,
		Price:       input.Price,
		Category:    input.Category,
		Available:   true,
		Description: input.Description,
		ImageURL:    input.ImageURL,
	}
	result := global.Db.Create(&menu)
	return menu, result.Error
}

// GetMenu lấy thông tin một món ăn
func GetMenu(id uuid.UUID) (models.Menu, error) {
	var menu models.Menu
	result := global.Db.First(&menu, "id = ?", id)
	return menu, result.Error
}

// UpdateMenu cập nhật thông tin một món ăn
func UpdateMenu(id uuid.UUID, input MenuInput) (models.Menu, error) {
	var menu models.Menu
	result := global.Db.First(&menu, "id = ?", id)
	if result.Error != nil {
		return menu, result.Error
	}

	menu.NameVi = input.NameVi
	menu.NameEn = input.NameEn
	menu.Price = input.Price
	menu.Category = input.Category
	menu.Available = input.Available
	menu.Description = input.Description
	menu.ImageURL = input.ImageURL
	menu.UpdatedAt = time.Now()

	result = global.Db.Save(&menu)
	return menu, result.Error
}

// DeleteMenu xóa một món ăn
func DeleteMenu(id uuid.UUID) error {
	var menu models.Menu
	result := global.Db.First(&menu, "id = ?", id)
	if result.Error != nil {
		return result.Error
	}

	result = global.Db.Delete(&menu)
	return result.Error
}
