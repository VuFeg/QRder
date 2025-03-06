package services

import (
	"QRder-be/configs"
	"QRder-be/models"
	"time"

	"github.com/google/uuid"
)

// OrderInput dùng để nhận dữ liệu khi tạo đơn hàng mới
type OrderInput struct {
    TableID       uuid.UUID          `json:"table_id" binding:"required"`
    TotalAmount   float64            `json:"total_amount" binding:"required"`
    Status        string             `json:"status"`
    PaymentMethod string             `json:"payment_method"`
    OrderItems    []OrderItemInput   `json:"order_items" binding:"required"`
}

// OrderItemInput dùng để nhận dữ liệu khi tạo mục đơn hàng mới
type OrderItemInput struct {
    MenuID   uuid.UUID `json:"menu_id" binding:"required"`
    Quantity int       `json:"quantity" binding:"required"`
    Price    float64   `json:"price" binding:"required"`
}

// GetOrders lấy danh sách các đơn hàng
func GetOrders() ([]models.Order, error) {
    var orders []models.Order
    result := configs.DB.Preload("OrderItems").Find(&orders)
    return orders, result.Error
}

// CreateOrder tạo đơn hàng mới
func CreateOrder(input OrderInput) (models.Order, error) {
    order := models.Order{
        ID:            uuid.New(),
        TableID:       input.TableID,
        TotalAmount:   input.TotalAmount,
        Status:        input.Status,
        PaymentMethod: input.PaymentMethod,
        CreatedAt:     time.Now(),
        UpdatedAt:     time.Now(),
    }

    result := configs.DB.Create(&order)
    if result.Error != nil {
        return order, result.Error
    }

    for _, item := range input.OrderItems {
        orderItem := models.OrderItem{
            ID:        uuid.New(),
            OrderID:   order.ID,
            MenuID:    &item.MenuID,
            Quantity:  item.Quantity,
            Price:     item.Price,
            CreatedAt: time.Now(),
        }
        configs.DB.Create(&orderItem)
    }

    return order, nil
}

// GetOrder lấy thông tin một đơn hàng
func GetOrder(id uuid.UUID) (models.Order, error) {
    var order models.Order
    result := configs.DB.Preload("OrderItems").First(&order, "id = ?", id)
    return order, result.Error
}

// UpdateOrder cập nhật thông tin một đơn hàng
func UpdateOrder(id uuid.UUID, input OrderInput) (models.Order, error) {
    var order models.Order
    result := configs.DB.First(&order, "id = ?", id)
    if result.Error != nil {
        return order, result.Error
    }

    order.TableID = input.TableID
    order.TotalAmount = input.TotalAmount
    order.Status = input.Status
    order.PaymentMethod = input.PaymentMethod
    order.UpdatedAt = time.Now()

    configs.DB.Save(&order)

    // Xóa các mục đơn hàng cũ
    configs.DB.Where("order_id = ?", id).Delete(&models.OrderItem{})

    // Thêm các mục đơn hàng mới
    for _, item := range input.OrderItems {
        orderItem := models.OrderItem{
            ID:        uuid.New(),
            OrderID:   id,
            MenuID:    &item.MenuID,
            Quantity:  item.Quantity,
            Price:     item.Price,
            CreatedAt: time.Now(),
        }
        configs.DB.Create(&orderItem)
    }

    return order, nil
}

// DeleteOrder xóa một đơn hàng
func DeleteOrder(id uuid.UUID) error {
    var order models.Order
    result := configs.DB.First(&order, "id = ?", id)
    if result.Error != nil {
        return result.Error
    }

    // Xóa các mục đơn hàng
    configs.DB.Where("order_id = ?", id).Delete(&models.OrderItem{})

    // Xóa đơn hàng
    result = configs.DB.Delete(&order)
    return result.Error
}