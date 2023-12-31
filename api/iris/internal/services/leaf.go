package services

import (
	"konserve/api/internal/models"

	"gorm.io/gorm"
)

type LeafService struct{ DB *gorm.DB }

func (service LeafService) Leaves() ([]models.Leaf, error) {
	var leaves []models.Leaf
	result := service.DB.Table("leaves").Find(&leaves)

	if err := result.Error; err != nil {
		return nil, err
	}

	return leaves, nil
}

func (service LeafService) Find(id int) (models.Leaf, error) {
	var leaf models.Leaf
	result := service.DB.Table("leaves").Find(&leaf, id)

	if err := result.Error; err != nil {
		return leaf, err
	}

	return leaf, nil
}

func (service LeafService) Create(leaf models.Leaf) (int64, error) {
	result := service.DB.Table("leaves").Omit("id").Create(&leaf)

	if err := result.Error; err != nil {
		return 0, err
	}

	return result.RowsAffected, nil
}

func (service LeafService) Update(leaf models.Leaf) (int64, error) {
	result := service.DB.Table("leaves").Where(models.Leaf{Id: leaf.Id}).Omit("id", "nodeId").Save(leaf)

	if err := result.Error; err != nil {
		return 0, err
	}

	return result.RowsAffected, nil
}

func (service LeafService) Delete(id int) (int64, error) {
	target, findErr := service.Find(id)
	if findErr != nil {
		return 0, findErr
	}

	result := service.DB.Table("leaves").Delete(&target, id)
	if err := result.Error; err != nil {
		return 0, err
	}

	return result.RowsAffected, nil
}
