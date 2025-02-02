FROM node:20-alpine 

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN npm i -g @nestjs/cli

RUN yarn --force

COPY apps/bot/package.json dist/apps/bot/
COPY apps/bot/tsconfig.app.json dist/apps/bot/

RUN yarn build:bot 

CMD yarn start:bot:prod