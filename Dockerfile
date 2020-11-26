FROM node:14-alpine

WORKDIR /app
COPY ./package* /app/
RUN npm ci

COPY . /app

ENTRYPOINT [ "npm", "start" ]
