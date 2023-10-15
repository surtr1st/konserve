package models

type Node struct {
	Id   int32  `json:"id,omitempty"`
	Name string `json:"name" validate:"required"`
	Uid  int32  `json:"uid" validate:"required"`
}
