package db

import (
  "gorm.io/gorm"
  "gorm.io/driver/sqlite"
  "konserve/api/internal/constants"
)

func UseGORM() *gorm.DB {
  gormConfig := &gorm.Config { }
  connectionString := constants.TURSO_URL
  db, err := gorm.Open(sqlite.Open(connectionString), gormConfig)
  if err != nil {
    panic("Failed to connect database!")
  }
  return db
}
