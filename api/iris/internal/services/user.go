package services

import (
	"konserve/api/internal/models"
	"konserve/api/internal/utils"
)

type UserService struct{}

var db = utils.UseTurso()

func (service UserService) Users() ([]models.User, error) {
	var users []models.User
	result := db.Find(&users)
	err := result.Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (service UserService) FindUser(uid int32) (models.User, error) {
	var user models.User
	result := db.Where(models.User{Uid: uid}).Find(&user)
	err := result.Error
	if err != nil {
		return user, err
	}
	return user, nil
}

func (service UserService) CreateUser(newUser models.User) (int64, error) {
	result := db.Omit("uid").Create(newUser)
	err := result.Error
	if err != nil {
		return 0, err
	}
	return result.RowsAffected, nil
}

func (service UserService) UpdateUser(data models.User) (int64, error) {
	result := db.Where(models.User{Uid: data.Uid}).Omit("uid").Save(data)
	err := result.Error
	if err != nil {
		return 0, err
	}
	return result.RowsAffected, nil
}

func (service UserService) DeleteUser(uid int32) (int64, error) {
	target, findErr := service.FindUser(uid)
	if findErr != nil {
		return 0, findErr
	}

	result := db.Delete(&target, uid)
	err := result.Error
	if err != nil {
		return 0, err
	}
	return result.RowsAffected, nil
}
