package env

import (
	"fmt"
	"os"
)

func UseEnv(name string) string {
  if _, ok := os.LookupEnv(name); !ok {
    return fmt.Sprintf("No env name `%s` present!", name)
  }
  return os.Getenv(name)
}
