# --- Stage 1: Build the Next.js app ---
FROM node:18-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy project files (after installing deps)
COPY . .

# Build the Next.js app
RUN npm run build

# --- Stage 2: Run the production build ---
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy production artifacts only
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8000

CMD ["npm", "start"]
