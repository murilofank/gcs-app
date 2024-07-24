# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /gcs-app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

WORKDIR /gcs-app/backend

# Build the Vue.js application
RUN node index.js

# Command to run the application
CMD ["node", "index.js"]
