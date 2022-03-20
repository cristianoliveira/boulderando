FROM node:17.7.1

WORKDIR /usr/app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

COPY . .

EXPOSE 3333

CMD [ "next", "dev" ]

