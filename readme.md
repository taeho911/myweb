# My Web

## Summanry

This project is playground of Taeho Kim.

## Prerequisite

node (*local version)
npm (*local version)
go (*local version)
mongodb (*local version)
docker (*docker-compose version)
docker-compose (*docker-compose version)

## Local version

### How to build

* Execute below command from root directory
```bash
$ ./go.sh build
```

* Caution: If you use go version lower than 1.16, it would be built using $GOPATH so you need to place this project under your $GOPATH/src

### How to start

* Execute below command from root directory
```bash
$ ./go.sh run
Access to webpage via http://localhost/
```

## Docker-compose version

### How to build

* Execute below command from root directory
```bash
$ docker-compose build
```

### How to start

* Execute below command from root directory
```bash
$ docker-compose up
Access to webpage via http://<hostname>/
```

## File structure

```
myweb
  ├ api               : Backend API containing routers and hendlers
  ├ db                : Agent for communicating with database
  ├ front             : Frontend react components
  ├ main.go
  ├ go.sh             : Bash script to control local version building amd deployment
  ├ docker-compose.yml
  └ Dockerfile
```