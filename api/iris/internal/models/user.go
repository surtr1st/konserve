package models

type User struct {
  Uid         int32   `json:"uid"`
  Email       string  `json:"email" validate:"required"`
  Username    string  `json:"username" validate:"required"`
  Password    string  `json:"password" validate:"required"`
  DisplayName string  `json:"displayName"`
  SecretCode  string  `json:"secretCode"`
}


