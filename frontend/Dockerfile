FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY .  ./


CMD ["npm", "start"]
