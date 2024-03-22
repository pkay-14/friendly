FROM node:20.11.1

WORKDIR /app

COPY package.json ./
RUN ls -al
RUN npm install

COPY . .
CMD ["npm", "run", "dev"]