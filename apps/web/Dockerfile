FROM node:18.16.0-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN yarn global add turbo pnpm
COPY . .

RUN turbo prune --scope=web --docker
 
FROM node:18.16.0-alpine AS installer

RUN apk add --no-cache libc6-compat
RUN apk update
RUN yarn global add turbo pnpm

WORKDIR /app
 
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml .

RUN pnpm install

COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=web... --concurrency 1

FROM node:18.16.0-alpine AS runner
 
# Don't run production as root
RUN addgroup --system --gid 1001 app 
RUN adduser --system --uid 1001 app 
USER app 
 
COPY --from=installer --chown=app:app /app/apps/web/.output/ /app
WORKDIR /app

ENV CONFIG_PATH=".env"

CMD export $(cat $CONFIG_PATH | xargs) && node server/index.mjs
