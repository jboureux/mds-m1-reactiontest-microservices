FROM node:lts-alpine AS builder

ARG SERVICE

ARG PORT

WORKDIR /app

COPY . .

RUN npm i -g pnpm

RUN pnpm i --filter ${SERVICE} 

RUN pnpm --filter ${SERVICE} build

FROM node:lts-alpine AS production

ARG SERVICE

WORKDIR /app

RUN apk --no-cache add curl

COPY  --from=builder /app/services/${SERVICE}/dist ./dist

COPY  --from=builder /app/services/${SERVICE}/package.json ./package.json

RUN npm install --only=prod

EXPOSE ${PORT}

CMD ["node", "dist/app.js"]