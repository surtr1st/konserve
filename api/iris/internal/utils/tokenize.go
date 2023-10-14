package utils

import "github.com/kataras/iris/v12/middleware/jwt"

var (
	SigKey = []byte(`signature_hmac_secret_shared_key`)
	EncKey = []byte("GCM_AES_256_secret_shared_key_32")
)

type TokenClaims struct {
	jwt.Claims
	UserId int32 `json:"userId"`
}

func GenerateToken(signer *jwt.Signer, claims TokenClaims) ([]byte, error) {
	token, err := signer.Sign(claims)
	if err != nil {
		return nil, err
	}
	return token, nil
}
