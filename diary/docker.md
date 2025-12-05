# Side Mission: The Chess.com Frontend Challenge - Part 1

Date: November 5, 2025

Tags: Docker, DevEx, Vue.js


## The Challenge

I recently stumbled upon an old public repository from Chess.com containing their frontend technical test. It's a classic: build a responsive chessboard with a sidebar that tracks moves.

While a standard approach would be to just build the UI, I'm using this as a playground to apply Developer Experience (DevEx) principles. My goal isn't just to make it work, but to make it delightful to work on.

## The "It Works on My Machine" Problem

The first thing I noticed is that this repo is 7 years old. If I just run npm install, it will likely fail because my local Node version is too new for the old dependencies, or too old for modern ones.

A new developer joining a team shouldn't have to spend 2 hours debugging version conflicts. They should be able to run one command and start coding.

## The DevEx Solution: Dockerizing the Environment

To solve this, I'm creating a "Zero-Config" environment using Docker. This ensures that the app runs in the exact same environment for everyone, regardless of their OS or local Node version.

### 1. The Dockerfile

I created a Dockerfile to define the environment. I'm using a multi-stage build to keep the final image light, though for dev, we mostly care about the build stage.

```
# Dockerfile
FROM node:18-alpine

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
```

### 2. Docker Compose

To make it even easier (so we don't have to remember long docker run commands), I added a docker-compose.yml.

```
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5173:5173"
    volumes:
      # Sync local folder with container folder for hot-reloading
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true # Fixes hot-reload on some systems
```

## The Result

Now, instead of fighting with Node versions, anyone can clone this repo and run:

```bash
docker compose up
```

The app starts instantly at http://localhost:5173, with hot-reloading enabled. This is the difference between "coding" and "engineering" a solution.

*Next Steps: Setting up a CI/CD pipeline to ensure code quality on every push.*