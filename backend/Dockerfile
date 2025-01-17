FROM node:20-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json nest-cli.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json nest-cli.json ./

RUN npm install --omit=dev

COPY . .
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"] 