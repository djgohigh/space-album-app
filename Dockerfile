FROM node:18-buster
  
WORKDIR /usr/src/space-album-app
COPY *.* /usr/src/space-album-app

RUN npm i

COPY . /usr/src/space-album-app

RUN --mount=type=secret,id=env,dst=.env

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]