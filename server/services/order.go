package services

import (
	"QRder-be/configs"
	"QRder-be/models"
	"time"

	"github.com/google/uuid"
)

// OrderInput chứa thông tin đầu vào khi tạo hoặc cập nhật đơn hàng.
type OrderInput struct {
    TableID       uuid.UUID `json:"table_id" binding:"required"`
    Note          string    `json:"note"`
    PaymentMethod string    `json:"payment_method"`
}

// CreateOrder tạo đơn hàng mới và gán OrderID vào bảng tables.
func CreateOrder(input OrderInput) (*models.Order, error) {
    // Tạo đối tượng Order mới.
    order := &models.Order{
        ID:            uuid.New(),
        TotalAmount:   0.00,
        Status:        "pending",
        Note:          input.Note,
        PaymentMethod: input.PaymentMethod,
        CreatedAt:     time.Now(),
        UpdatedAt:     time.Now(),
    }

    // Lưu order vào bảng orders.
    if err := configs.DB.Create(order).Error; err != nil {
        return nil, err
    }

    // Cập nhật bảng tables: gán OrderID vào bàn tương ứng.
    var table models.Table
    if err := configs.DB.First(&table, "id = ?", input.TableID).Error; err != nil {
        return nil, err
    }
    table.OrderID = &order.ID
    table.UpdatedAt = time.Now()
    if err := configs.DB.Save(&table).Error; err != nil {
        return nil, err
    }

    return order, nil
}

// GetOrder lấy thông tin đơn hàng theo ID và preload các order items.
func GetOrder(id uuid.UUID) (*models.Order, error) {
    var order models.Order
    if err := configs.DB.Preload("OrderItems.Menu").First(&order, "id = ?", id).Error; err != nil {
        return nil, err
    }
    return &order, nil
}

// GetAllOrders lấy danh sách tất cả các đơn hàng.
func GetAllOrders() ([]models.Order, error) {
    var orders []models.Order
    if err := configs.DB.Preload("OrderItems.Menu").Find(&orders).Error; err != nil {
        return nil, err
    }
    return orders, nil
}

// UpdateOrder cập nhật thông tin đơn hàng theo ID.
func UpdateOrder(id uuid.UUID, input OrderInput) (*models.Order, error) {
    var order models.Order
    if err := configs.DB.First(&order, "id = ?", id).Error; err != nil {
        return nil, err
    }

    order.Note = input.Note
    order.PaymentMethod = input.PaymentMethod
    order.UpdatedAt = time.Now()

    if err := configs.DB.Save(&order).Error; err != nil {
        return nil, err
    }
    return &order, nil
}

// DeleteOrder xóa đơn hàng theo ID và cập nhật lại bảng tables (xóa OrderID nếu có).
func DeleteOrder(id uuid.UUID) error {
    var order models.Order
    if err := configs.DB.First(&order, "id = ?", id).Error; err != nil {
        return err
    }

    // Tìm bàn đang gán OrderID = id, cập nhật lại cho bàn đó.
    var table models.Table
    if err := configs.DB.First(&table, "order_id = ?", id).Error; err == nil {
        table.OrderID = nil
        table.UpdatedAt = time.Now()
        if err := configs.DB.Save(&table).Error; err != nil {
            return err
        }
    }

    if err := configs.DB.Delete(&order).Error; err != nil {
        return err
    }
    return nil
}