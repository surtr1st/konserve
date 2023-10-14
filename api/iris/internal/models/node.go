package models

type Node struct {
	Id     int32  `json:"id"`
	Name   string `json:"name" validate:"required"`
	UserId int32  `json:"userId" validate:"required"`
}
