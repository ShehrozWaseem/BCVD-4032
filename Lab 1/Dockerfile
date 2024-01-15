FROM node:14

# setting the working directory in the container
WORKDIR /usr/src/app

# copy both lock and pkg
COPY package*.json ./

RUN npm install

# Copy  working code into the container envr
COPY . .

EXPOSE 3000

# Define the command to run the application using nodemon
CMD ["node_modules/nodemon/bin/nodemon.js", "index.js"]
