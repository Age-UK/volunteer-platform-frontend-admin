FROM node:14-alpine

WORKDIR /home/node/app

COPY package.json package-lock.json ./

RUN npm install