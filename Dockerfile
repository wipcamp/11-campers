FROM node:8.14-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN yarn install

COPY ./public ./public
COPY ./src ./src
COPY ./yarn.lock .
RUN yarn build

EXPOSE 3000
CMD ["yarn","start"]