package services

import (
	"konserve/api/internal/models"

	"gorm.io/gorm"
)

type UserService struct{ DB *gorm.DB }

func (service UserService) Users() ([]models.User, error) {
	var users []models.User
	result := service.DB.Find(&users)

	if err := result.Error; err != nil {
		return nil, err
	}
	return users, nil
}

func (service UserService) Find(uid int32) (models.User, error) {
	var user models.User
	result := service.DB.Find(&user, uid)

	if err := result.Error; err != nil {
		return user, err
	}
	return user, nil
}

func (service UserService) FindByUsername(username string) (models.User, error) {
	var user models.User

	result := service.DB.Where(models.User{Username: username}).Find(&user)

	if err := result.Error; err != nil {
		return user, err
	}

	return user, nil
}

func (service UserService) FindByEmail(email string) (int32, error) {
	var user models.User

	result := service.DB.Where(models.User{Email: email}).Find(&user)

	if err := result.Error; err != nil {
		return 0, nil
	}

	return user.Uid, nil
}

func (service UserService) Create(user models.User) (int64, error) {
	result := service.DB.Omit("uid").Create(user)

	if err := result.Error; err != nil {
		return 0, err
	}

	return result.RowsAffected, nil
}

func (service UserService) Update(user models.User) (int64, error) {
	result := service.DB.Where(models.User{Uid: user.Uid}).Omit("uid").Save(user)

	if err := result.Error; err != nil {
		return 0, err
	}

	return result.RowsAffected, nil
}

func (service UserService) Delete(uid int32) (int64, error) {
	target, findErr := service.Find(uid)
	if findErr != nil {
		return 0, findErr
	}

	result := service.DB.Delete(&target, uid)

	if err := result.Error; err != nil {
		return 0, err
	}

	return result.RowsAffected, nil
}
