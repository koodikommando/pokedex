FROM node:22-slim

WORKDIR /app

ENV CI=true


COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . ./


CMD ["npm", "run", "dev"]
