# 1. Use official Node.js image as base
FROM node:20-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and lock file
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

# 2. Set NODE_ENV
ENV NODE_ENV=production

# 3. Copy package.json and lock file
COPY package*.json ./

# 4. Install only production dependencies
RUN npm install --production

# 5. Copy build output from builder
COPY --from=builder /app ./

# 6. Expose Next.js port
EXPOSE 3000

# 7. Start Next.js app
CMD ["npm", "run", "start"]
