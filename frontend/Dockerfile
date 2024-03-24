FROM node:20.11.1

RUN npm install -g http-server
WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]
