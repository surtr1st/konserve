package utils

import "golang.org/x/crypto/bcrypt"

type Encrypto struct{}

func (enc Encrypto) IsMatch(compared []byte, original string) error {
	return bcrypt.CompareHashAndPassword(compared, []byte(original))
}

func (enc Encrypto) Hash(target string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(target), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}
