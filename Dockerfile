# Use Node.js LTS version on Debian Buster
FROM node:lts-buster

# Set working directory inside container
WORKDIR /app

# Copy only package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1

# Copy the rest of the app files
COPY . .

# Expose your app's port
EXPOSE 9090

# Start the app with PM2
CMD ["pm2-runtime", "index.js"]
