package services

import (
	"QRder-be/configs"
	"QRder-be/models"
	"time"

	"github.com/google/uuid"
)

// OrderItemInput chứa dữ liệu đầu vào khi tạo hoặc cập nhật OrderItem.
type OrderItemInput struct {
    OrderID  uuid.UUID `json:"order_id" binding:"required"`
    MenuID   uuid.UUID `json:"menu_id" binding:"required"`
    Quantity int       `json:"quantity" binding:"required,gt=0"`
    Price    float64   `json:"price" binding:"required"`
}

type UpdateOrderItemInput struct {
    OrderID  uuid.UUID `json:"order_id" binding:"required"`
    MenuID   uuid.UUID `json:"menu_id" binding:"required"`
    Quantity int       `json:"quantity" binding:"required,gt=0"`
    Price    float64   `json:"price" binding:"required"`
}

// CreateOrderItem tạo mới một order item và lưu vào database.
func CreateOrderItem(input OrderItemInput) (*models.OrderItem, error) {
    orderItem := &models.OrderItem{
        ID:        uuid.New(),
        OrderID:   input.OrderID,
        MenuID:    input.MenuID,
        Quantity:  input.Quantity,
        Price:     input.Price,
        CreatedAt: time.Now(),
    }

    if err := configs.DB.Create(orderItem).Error; err != nil {
        return nil, err
    }

    return orderItem, nil
}

// GetOrderItem trả về thông tin order item theo ID.
func GetOrderItem(id uuid.UUID) (*models.OrderItem, error) {
    var orderItem models.OrderItem
    if err := configs.DB.First(&orderItem, "id = ?", id).Error; err != nil {
        return nil, err
    }
    return &orderItem, nil
}

// UpdateOrderItem cập nhật thông tin order item theo ID.
func UpdateOrderItem(id uuid.UUID, input UpdateOrderItemInput) (*models.OrderItem, error) {
    var orderItem models.OrderItem
    if err := configs.DB.First(&orderItem, "id = ?", id).Error; err != nil {
        return nil, err
    }

    orderItem.MenuID = input.MenuID
    orderItem.Quantity = input.Quantity
    orderItem.Price = input.Price

    if err := configs.DB.Save(&orderItem).Error; err != nil {
        return nil, err
    }

    return &orderItem, nil
}

// DeleteOrderItem xóa order item theo ID.
func DeleteOrderItem(id uuid.UUID) error {
    var orderItem models.OrderItem
    if err := configs.DB.First(&orderItem, "id = ?", id).Error; err != nil {
        return err
    }

    if err := configs.DB.Delete(&orderItem).Error; err != nil {
        return err
    }
    return nil
}