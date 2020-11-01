FROM node:14.5.0

WORKDIR /app/

RUN apt-get update

ARG NODE_ENV
ARG POSTGRES_DATABASE_URL
ARG API_PUBLIC_URL
ARG API_PORT
ARG API_HOST

ADD package*.json /app/

RUN npm install --production=false

ADD . /app/

EXPOSE $API_PORT