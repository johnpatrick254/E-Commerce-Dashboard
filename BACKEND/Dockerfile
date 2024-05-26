FROM node:20-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install 

COPY ./dist /app/dist

EXPOSE 80

CMD [ "node", "dist/index.js"]