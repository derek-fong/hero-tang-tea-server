FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN NODE_ENV=production npm run build

RUN npm prune --production

EXPOSE $PORT

CMD [ "npm", "start" ]
