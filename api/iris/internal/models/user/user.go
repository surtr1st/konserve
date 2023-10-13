package user

type User struct {
  Uid         int32   `json:"uid"`
  Email       string  `json:"email"`
  Username    string  `json:"username"`
  Password    string  `json:"password"`
  DisplayName string  `json:"displayName"`
  SecretCode  string  `json:"secretCode"`
}


