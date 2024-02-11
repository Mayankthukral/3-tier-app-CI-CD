
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY task-manager-frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY task-manager-frontend/ .

# Expose the port your app will run on
EXPOSE 3000
# Command to run your application
CMD ["npm", "start"]