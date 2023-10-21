package models

type Leaf struct {
	Id       int    `json:"id,omitempty"`
	Username string `json:"username" validate:"required"`
	Password string `json:"password,omitempty"`
	NodeId   int    `json:"nodeId" validate:"required"`
}
