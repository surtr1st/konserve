package services

import (
	"konserve/api/internal/models"

	"gorm.io/gorm"
)

type NodeService struct{ DB *gorm.DB }

func (service NodeService) Nodes() ([]models.Node, error) {
	var nodes []models.Node
	result := service.DB.Find(&nodes)

	if err := result.Error; err != nil {
		return nil, err
	}

	return nodes, nil
}

func (service NodeService) Find(id int) (models.Node, error) {
	var node models.Node
	result := service.DB.Find(&node, id)

	if err := result.Error; err != nil {
		return node, err
	}

	return node, nil
}

func (service NodeService) FindByUser(uid int) ([]models.Node, error) {
	var nodes []models.Node
	result := service.DB.Where(models.Node{Uid: uid}).Find(&nodes)

	if err := result.Error; err != nil {
		return nodes, err
	}

	return nodes, nil
}

func (service NodeService) Create(node models.Node) (int64, error) {
	result := service.DB.Omit("id").Create(&node)

	if err := result.Error; err != nil {
		return 0, err
	}

	return result.RowsAffected, nil
}

func (service NodeService) Update(node models.Node) (int64, error) {
	result := service.DB.Where(models.Node{Id: node.Id}).Omit("id", "uid").Save(node)

	if err := result.Error; err != nil {
		return 0, err
	}

	return result.RowsAffected, nil
}

func (service NodeService) Delete(id int) (int64, error) {
	target, findErr := service.Find(id)
	if findErr != nil {
		return 0, findErr
	}

	result := service.DB.Delete(&target, id)

	if err := result.Error; err != nil {
		return 0, err
	}

	return result.RowsAffected, nil
}
