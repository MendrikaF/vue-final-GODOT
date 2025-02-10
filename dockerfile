# Stage 1: Build the application
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Vue.js project files
COPY . .

# Build the Vue.js app
RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine

# Copy the build files from the previous stage to the Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Run Nginx to serve the Vue.js app
CMD ["nginx", "-g", "daemon off;"]