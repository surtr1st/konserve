package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/json"
	"os"

	"golang.org/x/crypto/bcrypt"
)

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

func (enc encrypt) Encrypt(file string, secretCode string) ([]byte, error) {
	// Read the JSON file
	data, err := os.ReadFile(file)
	if err != nil {
		return nil, err
	}

	// Create a new AES cipher block
	block, err := aes.NewCipher([]byte(secretCode))
	if err != nil {
		return nil, err
	}

	// Create a GCM (Galois/Counter Mode) cipher
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	// Generate a random nonce
	nonce := make([]byte, aesGCM.NonceSize())
	if _, err := rand.Read(nonce); err != nil {
		return nil, err
	}

	// Encrypt the data
	encryptedData := aesGCM.Seal(nonce, nonce, data, nil)

	return encryptedData, nil
}

func (enc encrypt) WriteTo(dest string, data []byte) error {
	err := os.WriteFile(dest, data, 0644)
	if err != nil {
		return err
	}
	return nil
}

func (enc encrypt) Decrypt(file string, secretCode string) (map[string]interface{}, error) {
	// Read the encrypted data
	encryptedData, err := os.ReadFile(file)
	if err != nil {
		return nil, err
	}

	// Create a new AES cipher block
	block, err := aes.NewCipher([]byte(secretCode))
	if err != nil {
		return nil, err
	}

	// Create a GCM (Galois/Counter Mode) cipher
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	// Get the nonce
	nonceSize := aesGCM.NonceSize()
	nonce, encryptedData := encryptedData[:nonceSize], encryptedData[nonceSize:]

	// Decrypt the data
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
