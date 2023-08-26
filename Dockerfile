FROM node:14

WORKDIR /usr/src/app

COPY . /app

RUN npm install

COPY . .

EXPOSE 80

CMD ["node", "index.js"]
