FROM node:20-slim

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

CMD [ "node", "server.js" ]
