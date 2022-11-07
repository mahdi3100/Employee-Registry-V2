FROM node:16
RUN mkdir -p /Employee
WORKDIR /Employee
COPY package.json ./
RUN npm install
COPY . .
CMD npm start