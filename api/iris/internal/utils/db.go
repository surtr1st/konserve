package utils

import (
	"database/sql"
	"konserve/api/internal/constants/env"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	_ "github.com/libsql/libsql-client-go/libsql"
)

func UseTurso() *gorm.DB {
	config := &gorm.Config{SkipDefaultTransaction: true}
	connectionString := env.TURSO_URL

	turso, connectErr := sql.Open("libsql", connectionString)
	if connectErr != nil {
		panic("Failed to connect Turso!")
	}

	db, err := gorm.Open(sqlite.Dialector{DriverName: "libsql", Conn: turso}, config)
	if err != nil {
		panic("Failed to connect database!")
	}

	return db
}
