package services

import (
	"database/sql"
	"konserve/api/internal/models"
	"konserve/api/internal/utils"
)

const (
  RETRIEVE_USERS  = "SELECT uid, email, username, password, display_name, secret_code FROM users"
  INSERT_USER     = "INSERT INTO users (email, username, password, display_name, secret_code) VALUES (?, ?, ?, ?, ?)"
  UPDATE_USER     = "UPDATE users SET email = $1 SET username = $2 SET password = $3 SET display_name = $4 SET secret_code = $5 WHERE uid = $6"
  DELETE_USER     = "DELETE FROM users WHERE uid = ?"
)

type UserService struct {}

func (service UserService) Users() ([]models.User, error) {
  turso := utils.UseTurso()
  rows, err := turso.Query(RETRIEVE_USERS)
  if err != nil {
    return nil, err
  }
  defer rows.Close()

  var users []models.User
  t := utils.Ternary {}

  for rows.Next() {
    var user models.User
    var displayName sql.NullString
    var secretCode sql.NullString
    if err := rows.Scan(&user.Uid, &user.Email, &user.Username, &user.Password, &displayName, &secretCode); err != nil {
      return nil, err
    }
    user.DisplayName = t.AssignAfterCompare(displayName.Valid, displayName.String, "")
    user.SecretCode = t.AssignAfterCompare(secretCode.Valid, secretCode.String, "")

    users = append(users, user)
  }
  defer turso.Close()

  return users, nil
}

func (service UserService) CreateUser(newUser models.User) (int64, error) {
  turso := utils.UseTurso()

  result, err := turso.Exec(INSERT_USER, newUser.Email, newUser.Username, newUser.Password, newUser.DisplayName, newUser.SecretCode)
  if err != nil {
    return 0, err
  }
  response, _ := result.LastInsertId()
  defer turso.Close()

  return response, nil
}

func (service UserService) UpdateUser(uid int32, data models.User) (int64, error) {
  turso := utils.UseTurso()

  result, err := turso.Exec(UPDATE_USER, data.Email, data.Username, data.Password, data.DisplayName, data.SecretCode, uid)
  if err != nil {
    return 0, err
  }
  response, _ := result.RowsAffected()
  defer turso.Close()

  return response, nil
}

func (service UserService) DeleteUser(uid int32) (int64, error) {
  turso := utils.UseTurso()

  result, err := turso.Exec(DELETE_USER, uid)
  if err != nil {
    return 0, err
  }
  response, _ := result.RowsAffected()
  defer turso.Close()

  return response, nil
}

