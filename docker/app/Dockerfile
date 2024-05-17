###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20.9.0-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20.9.0-alpine AS build

WORKDIR /app

COPY package*.json ./

COPY --from=development /app/node_modules ./node_modules

COPY . .

RUN yarn run build

ENV NODE_ENV production

RUN yarn install --production=true && yarn cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:20.9.0-alpine AS production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD [ "node", "dist/app.js server:start" ]
