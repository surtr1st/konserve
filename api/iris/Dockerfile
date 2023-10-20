FROM golang:1.21-alpine as builder

RUN mkdir -p /go/src/konserve
COPY . /go/src/konserve
WORKDIR /go/src/konserve

ENV GO111MODULE=on
RUN go mod download
RUN go build ./cmd/main.go

FROM alpine:latest
WORKDIR /usr/home/app
COPY --from=builder /go/src/konserve/main /usr/home/app
EXPOSE 4000
ENTRYPOINT [ "./main" ]
