package utils

import (
	"database/sql"
	"konserve/api/internal/constants/env"
	locale "konserve/api/pkg/localization"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	_ "github.com/libsql/libsql-client-go/libsql"
)

// Return GORM DB for manipulating Turso's SQLite database
func UseTurso() *gorm.DB {
	driverName := "libsql"
	config := &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	}
	connectionString := env.TURSO_URL

	turso, connectErr := sql.Open(driverName, connectionString)
	if connectErr != nil {
		panic(locale.TURSO_CONNECTION_ERROR)
	}

	db, err := gorm.Open(sqlite.Dialector{DriverName: driverName, Conn: turso}, config)
	if err != nil {
		panic(locale.DATABASE_CONNECTION_ERROR)
	}

	return db
}
