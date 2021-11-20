FROM golang:1.17.3-alpine3.14
WORKDIR /app
COPY . .
RUN apk add --no-cache nodejs npm \
    && go install \
    && mkdir -p ${HOME}/www/myweb/static \
    && cd front \
    && npm install \
    && npm run build \
    && mv dist ${HOME}/www/myweb/static \
    && rm -f api db main.go go.mod go.sum
VOLUME /mnt/logs
CMD sh -c "myweb 2>&1 | tee -a /mnt/logs/myweb.log"
