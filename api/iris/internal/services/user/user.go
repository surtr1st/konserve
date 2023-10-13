package user

import (
	"database/sql"
	"konserve/api/internal/models/user"
	"konserve/api/internal/utils/db"
	"konserve/api/internal/utils/ternary"
)

const (
  RETRIEVE_USERS  = "SELECT uid, email, username, password, display_name, secret_code FROM users"
)

func Users() ([]user.User, error) {
  turso := db.UseTurso()
  rows, err := turso.Query(RETRIEVE_USERS)
  if err != nil {
    return nil, err
  }
  defer rows.Close()

  var users []user.User
  t := ternary.Ternary {}

  for rows.Next() {
    var user user.User
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
