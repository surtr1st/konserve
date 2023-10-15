package models

type Leaf struct {
	Id       int32  `json:"id,omitempty"`
	Username string `json:"username" validate:"required"`
	Password string `json:"password,omitempty"`
	NodeId   int32  `json:"nodeId" validate:"required"`
}
