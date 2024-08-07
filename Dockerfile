# Use the official Node.js image.
FROM node:18-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy the app code to the container.
COPY . .

# Copy the .env file
COPY .env .env

# Install dependencies.
RUN npm install

# Build the app
RUN npm run build

# Expose the port the app runs on.
EXPOSE 3000

# Run the web service on container startup.
CMD ["npm", "start"]
