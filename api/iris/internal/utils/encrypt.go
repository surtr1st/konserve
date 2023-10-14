package utils

import "golang.org/x/crypto/bcrypt"

type Encrypt struct{}

func (enc Encrypt) IsMatch(compared []byte, original string) error {
	return bcrypt.CompareHashAndPassword(compared, []byte(original))
}

func (enc Encrypt) Hash(target string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(target), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}
