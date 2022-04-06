FROM node:17-alpine3.14

ARG exposed_port

COPY . .

RUN npm install

ENV NODE_ENV=production

EXPOSE $exposed_port

CMD [ "npm", "start" ]
