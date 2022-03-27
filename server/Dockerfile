FROM node:17.7.1

WORKDIR /usr/server

COPY package.json package.json
COPY yarn.lock yarn.lock

COPY . .

RUN yarn

EXPOSE 4444

CMD [ "yarn", "start" ]

