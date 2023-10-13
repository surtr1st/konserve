package controllers

import (
	"konserve/api/internal/helpers"
	"konserve/api/internal/models"
	"konserve/api/internal/utils"
	"strings"
	"time"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

type AuthController struct{}

var sigKey = []byte(`Aduadasjkdhadasjkhjahdjakdhjak`)

func (ctrl AuthController) Authenticate(ctx iris.Context) {
	t := utils.Ternary[string]{}
	v := helpers.Validate{}
	authHeader := ctx.Request().Header.Get("Authorization")
	token := t.AssignAfterCondition(v.IsEmpty(authHeader), "", strings.Split(authHeader, " ")[0])
	var account models.Account
	err := ctx.ReadJSON(&account)
	if err != nil {
		ctx.StopWithJSON(iris.StatusInternalServerError, err)
		return
	}

	if v.IsEmpty(token) {
		signer := jwt.NewSigner(jwt.ES256, sigKey, time.Hour)
		claims := utils.TokenClaims{UserId: string("")}
		accessToken, err := utils.GenerateToken(signer, claims)
		if err != nil {
			ctx.StopWithJSON(iris.StatusInternalServerError, err)
			return
		}
		ctx.JSON(iris.Map{"accessToken": accessToken, "userId": ""})
	}

	// verifier := jwt.NewVerifier(jwt.ES256, sigKey).WithDecryption([]byte(""), nil).WithDefaultBlocklist()
	// verify, _ := verifier.VerifyToken([]byte(token))
	// if v.IsEmpty(string(verify.Payload)) {
	// 	ctx.StopWithJSON(iris.StatusForbidden, iris.Map{"message": "Invalid token or your token has been expired."})
	// 	return
	// }
}
