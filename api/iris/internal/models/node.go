package models

type Node struct {
	Id   int    `json:"id,omitempty"`
	Name string `json:"name" validate:"required"`
	Uid  int    `json:"uid" validate:"required"`
}
