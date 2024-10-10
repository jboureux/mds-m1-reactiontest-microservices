FROM node:lts-alpine
ARG SERVICE
ENV SERVICE=$SERVICE

WORKDIR /app

COPY . .

RUN npm i -g pnpm

CMD pnpm install --filter ${SERVICE} && pnpm --filter ${SERVICE} dev
