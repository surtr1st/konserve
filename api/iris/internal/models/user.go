package models

type (
	User struct {
		Uid         int32  `json:"uid,omitempty"`
		Email       string `json:"email" validate:"required"`
		Username    string `json:"username" validate:"required"`
		Password    string `json:"password" validate:"required"`
		DisplayName string `json:"displayName,omitempty"`
		SecretCode  string `json:"secretCode"`
	}
	Account struct {
		Username string `json:"username" validate:"required"`
		Password string `json:"password" validate:"required"`
	}
)
