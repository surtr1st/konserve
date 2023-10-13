package node

type Node struct {
  Id         int32     `json:"id"`
  Name       string    `json:"name" validate:"required"`
  UserId     string    `json:"userId" validate:"required"`
}

