package controllers

import (
	"QRder-be/configs"
	"QRder-be/models"
	"QRder-be/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type LoginInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Login xử lý API POST /login
func Login(c *gin.Context) {
    var input LoginInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var staff models.Staff
    if err := configs.DB.Where("username = ?", input.Username).First(&staff).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Username hoặc password không chính xác"})
        return
    }

    // Sử dụng bcrypt để so sánh mật khẩu
    if err := bcrypt.CompareHashAndPassword([]byte(staff.Password), []byte(input.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Username hoặc password không chính xác"})
        return
    }

    token, err := utils.GenerateToken(staff.ID.String(), staff.Role)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"token": token})
}

type RegisterInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Register(c *gin.Context) {
	var input RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash password trước khi lưu
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Lỗi mã hóa mật khẩu"})
		return
	}

	staff := models.Staff{
		ID:        uuid.New(),
		Username:  input.Username,
		Password:  string(hashedPassword),
		Role:      "staff",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// Lưu vào database
	result := configs.DB.Create(&staff)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Staff created successfully"})
}