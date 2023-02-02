FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY ./src ./src
COPY ./tests ./tests

CMD ["node", "./src/server.js"]