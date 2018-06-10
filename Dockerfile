FROM node:8.10-alpine AS builder

ENV NODE_ENV production

RUN apk add --no-cache curl \
    && curl -L https://unpkg.com/@pnpm/self-installer | node

COPY package.json shrinkwrap.yaml /tmp/app/
RUN cd /tmp/app \
    && time pnpm install \
    && pnpm prune

################################################################################

FROM node:8.10-alpine

ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN rm -rf /usr/src/app/node_modules
COPY --from=builder /tmp/app/node_modules /usr/src/app/node_modules

EXPOSE 3000

CMD [ "npm", "start:debug" ]
