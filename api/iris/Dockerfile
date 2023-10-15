FROM golang:latest AS builder

WORKDIR /app

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

RUN go install ./cmd/main.go

FROM scratch

COPY --from=builder /go/bin/main /main

CMD [ "/main" ]

EXPOSE 4000


