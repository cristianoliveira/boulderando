FROM node:17.7.1

WORKDIR /usr/web

COPY package.json package.json
COPY yarn.lock yarn.lock

COPY . .

RUN yarn

EXPOSE 3333

CMD [ "next", "dev" ]

