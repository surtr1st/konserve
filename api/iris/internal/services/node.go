package services

import (
	"konserve/api/internal/models"

	"gorm.io/gorm"
)

type NodeService struct{ DB *gorm.DB }

func (service NodeService) Nodes() ([]models.Node, error) {
	var nodes []models.Node
	result := service.DB.Find(&nodes)
	err := result.Error
	if err != nil {
		return nil, err
	}
	return nodes, nil
}

func (service NodeService) FindNode(uid int32) (models.Node, error) {
	var node models.Node
	result := service.DB.Find(&node, uid)
	err := result.Error
	if err != nil {
		return node, err
	}
	return node, nil
}

func (service NodeService) CreateNode(node models.Node) (int64, error) {
	result := service.DB.Omit("id").Create(node)
	err := result.Error
	if err != nil {
		return 0, err
	}
	return result.RowsAffected, nil
}

func (service NodeService) UpdateNode(node models.Node) (int64, error) {
	result := service.DB.Where(models.User{Uid: node.Id}).Omit("id").Save(node)
	err := result.Error
	if err != nil {
		return 0, err
	}
	return result.RowsAffected, nil
}

func (service NodeService) DeleteNode(id int32) (int64, error) {
	target, findErr := service.FindNode(id)
	if findErr != nil {
		return 0, findErr
	}

	result := service.DB.Delete(&target, id)
	err := result.Error
	if err != nil {
		return 0, err
	}
	return result.RowsAffected, nil
}
