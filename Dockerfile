FROM node:18-alpine

WORKDIR /usr/src/space-album-app

COPY *.* /usr/src/space-album-app

RUN npm install

COPY . /usr/src/space-album-app

RUN npm run build

ENTRYPOINT ["npm", "run", "dev"]