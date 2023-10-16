package env

import (
	"fmt"
	"os"
)

var (
	TURSO_URL        = useEnv("TURSO_URL")
	TURSO_AUTH_TOKEN = useEnv("TURSO_AUTH_TOKEN")
	ALLOWED_ORIGINS  = useEnv("ALLOWED_ORIGINS")
	SIGNATURE_KEY    = useEnv("SIGNATURE_KEY")
)

func useEnv(name string) string {
	if _, ok := os.LookupEnv(name); !ok {
		return fmt.Sprintf("No env name `%s` present!", name)
	}
	return os.Getenv(name)
}
