package utils

import "golang.org/x/crypto/bcrypt"

type encrypt struct{}

func UseEncrypt() encrypt {
	return encrypt{}
}

func (enc encrypt) IsMatch(compared []byte, original string) error {
	return bcrypt.CompareHashAndPassword(compared, []byte(original))
}

func (enc encrypt) Hash(target string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(target), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}
