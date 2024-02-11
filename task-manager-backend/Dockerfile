FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the backend folder
COPY  . .

# Expose the port your app will run on
EXPOSE 5000

# Command to run your application
CMD ["node", "index.js"]
