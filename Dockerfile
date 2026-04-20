# Stage 1: Build
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Set memory limit for the build process (Vite 8 + React 19 is memory intensive)
ENV NODE_OPTIONS=--max-old-space-size=4096

# Copy package files
COPY package*.json ./

# Clean install dependencies
RUN npm ci || npm install

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve
FROM node:20-slim

WORKDIR /app

# Only copy the built assets
COPY --from=builder /app/dist ./dist

# Install 'serve' locally in this stage for stable execution
RUN npm install serve

# Cloud Run uses port 8080 by default
EXPOSE 8080

# Serve static files
CMD ["npx", "serve", "-s", "dist", "-l", "8080"]
