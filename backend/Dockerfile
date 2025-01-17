FROM node:20-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json nest-cli.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

RUN mkdir -p public
RUN npm run build

FROM node:20-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production
RUN mkdir -p public

COPY . .
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/public ./public

CMD ["node", "dist/main"] 