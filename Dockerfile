FROM node:18.19.0

RUN mkdir /app

## 设置工作目录为 /app
WORKDIR /app

COPY ./.output /app/.output
COPY ecosystem.config.js /app/

## 安装pm2
RUN npm install pm2 -g