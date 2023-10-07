GET http://localhost:3000/node
HTTP 200
[Asserts]
jsonpath "$" count >= 0


POST http://localhost:3000/node
Accept: application/json
{
  "name": "",
  "userId": 1
}
HTTP 404
[Asserts]
{"message":"Please provide the name!"}


POST http://localhost:3000/node
Content-Type: application/json
{
  "name": "node-test"
}
HTTP 404
[Asserts]
{"message":"Unknown node owner!"}


POST http://localhost:3000/node
Content-Type: application/json
{
  "name": "node-test",
  "userId": 1
}
HTTP 201



