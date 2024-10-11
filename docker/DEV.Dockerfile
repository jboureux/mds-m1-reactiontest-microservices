FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm i -g pnpm
RUN apk --no-cache add curl

USER node

EXPOSE 8000-8003

CMD pnpm install && pnpm -r dev
