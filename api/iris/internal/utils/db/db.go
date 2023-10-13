package db

import (
	"database/sql"
	"konserve/api/internal/constants"

	_ "github.com/libsql/libsql-client-go/libsql"
)

func UseTurso() *sql.DB {
  connectionString := constants.TURSO_URL
  db, err := sql.Open("libsql", connectionString)
  if err != nil {
    panic("Failed to connect database!")
  }
  return db
}
