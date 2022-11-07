FROM node:16
RUN mkdir -p /Employee
WORKDIR /Employee
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
#from docker_compose
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL
#EXPOSE 3131
CMD npm start
