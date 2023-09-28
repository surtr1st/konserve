GET http://localhost:3000/sign/@test_signing

HTTP 200
[Asserts]
jsonpath "$.count" > 0

