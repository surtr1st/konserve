package models

type Leaf struct {
  Id         int32     `json:"id"`
  Username   string    `json:"username" validate:"required"`
  Password   string    `json:"password" validate:"required"`
  NodeId     int32     `json:"nodeId" validate:"required"`
}

