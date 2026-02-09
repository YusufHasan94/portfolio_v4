# 1. Use official Node.js image as base
FROM node:20-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json / yarn.lock
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application
COPY . .

# 6. Build Next.js app
RUN npm run build

# ---- Production image ----
FROM node:20-alpine AS runner

# 1. Set working directory
WORKDIR /app

# 2. Copy package.json and package-lock.json / yarn.lock
COPY package*.json ./

# 3. Install only production dependencies
RUN npm install --production

# 4. Copy build output
