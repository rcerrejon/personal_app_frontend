FROM node:12-alpine
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN apk add --no-cache python build-base
RUN npm install
RUN npm install -g node-gyp
#RUN apk del build-base
COPY . /app
RUN npm run build

EXPOSE 80
ENTRYPOINT npm run start
