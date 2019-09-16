FROM node:12-alpine
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN apk add --no-cache python build-base
RUN npm install
RUN npm install -g node-gyp
RUN apt update && apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt update && apt install -y nodejs
#RUN apk del build-base
COPY . /app
RUN npm run build

EXPOSE 80
CMD ["npm", "start"]
ENTRYPOINT npm run start
