FROM node:20.11.1

WORKDIR /app

COPY package.json /app
RUN ls -al
RUN npm install

COPY . /app
CMD ["npm", "run", "dev"]