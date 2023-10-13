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
