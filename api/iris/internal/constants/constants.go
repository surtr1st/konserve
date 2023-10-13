package constants

import "konserve/api/internal/utils/env"

var (
  TURSO_URL           = env.UseEnv("TURSO_URL")
  TURSO_AUTH_TOKEN    = env.UseEnv("TURSO_AUTH_TOKEN")
  ALLOWED_ORIGINS     = env.UseEnv("ALLOWED_ORIGINS")
  JWT_SECRET          = env.UseEnv("JWT_SECRET")
)
