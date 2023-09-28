POST http://localhost:3000/auth

Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiand0Iiwic2VjcmV0IjoiRW5kbGVzcyBQYWluIn0.8S4fInly9feZVbFuhdNSSggDR3peRDVqwWVUIRcK0Fk
{
  "username": "test@uname",
  "password": "test@pwd"
}

HTTP 403
[Asserts]
"Invalid token or your token has been expired."


POST http://localhost:3000/auth

Content-Type: application/json
{
  "username": "test@uname",
  "password": "test@123"
}

HTTP 404
[Asserts]
"User not found!";






