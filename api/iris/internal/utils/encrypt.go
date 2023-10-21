package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/json"
	"os"

	"golang.org/x/crypto/bcrypt"
)

type encrypt struct{}

func UseEncrypt() encrypt {
	return encrypt{}
}

// To check if the `compared` bytes equals to the hashed original
// Return either `error` or `nil`
func (enc encrypt) IsMatch(compared []byte, original string) error {
	return bcrypt.CompareHashAndPassword(compared, []byte(original))
}

// To hash the target with bcrypt algorithm
// Return a tuple of hash string and an error
func (enc encrypt) Hash(target string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(target), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}

// To encrypt content of a file, preserved by a secret code
// Use AES algorithm for encryption
// Return a tuple of encrypted data and an error
func (enc encrypt) Encrypt(data []byte, secretCode string) ([]byte, error) {
	key := sha256.Sum256([]byte(secretCode))
	block, err := aes.NewCipher(key[:])
	if err != nil {
		return nil, err
	}

	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonce := make([]byte, aesGCM.NonceSize())
	if _, err := rand.Read(nonce); err != nil {
		return nil, err
	}

	encryptedData := aesGCM.Seal(nonce, nonce, data, nil)

	return encryptedData, nil
}

// Write encrypted data to new destination
// Return either `error` or `nil`
func (enc encrypt) WriteTo(dest string, data []byte) error {
	err := os.WriteFile(dest, data, 0644)
	if err != nil {
		return err
	}
	return nil
}

// To dencrypt content of a file, unlocked by a secret code
// Return a tuple of dencrypted data and an error
func (enc encrypt) Decrypt(file string, secretCode string) (map[string]interface{}, error) {
	encryptedData, err := os.ReadFile(file)
	if err != nil {
		return nil, err
	}

	key := sha256.Sum256([]byte(secretCode))
	block, err := aes.NewCipher(key[:])
	if err != nil {
		return nil, err
	}

	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonceSize := aesGCM.NonceSize()
	nonce, encryptedData := encryptedData[:nonceSize], encryptedData[nonceSize:]

	decryptedData, err := aesGCM.Open(nil, nonce, encryptedData, nil)
	if err != nil {
		return nil, err
	}

	var data map[string]interface{}
	if err := json.Unmarshal(decryptedData, &data); err != nil {
		return nil, err
	}

	return data, nil
}
