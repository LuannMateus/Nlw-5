FROM node:15-alpine3.10

RUN apk add --no-cache bash


USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY . .
