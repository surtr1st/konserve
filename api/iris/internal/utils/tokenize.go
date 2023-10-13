package utils

import "github.com/kataras/iris/v12/middleware/jwt"

type TokenClaims struct {
	Claims string `json:"claims"`
}

func GenerateToken(signer *jwt.Signer, claims TokenClaims) ([]byte, error) {
	token, err := signer.Sign(claims)
	if err != nil {
		return nil, err
	}
	return token, nil
}
