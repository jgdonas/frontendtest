# Dockerfile
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the Vite default port
EXPOSE 5173

# Default command
CMD ["npm", "run", "dev", "--", "--host"]
