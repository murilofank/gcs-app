# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue.js application
RUN cd backend/

# Use a minimal HTTP server to serve the built application
RUN node index.js

# Set the command to run the application
CMD ["serve", "-s", "dist"]

# Expose the port the app runs on
EXPOSE 80