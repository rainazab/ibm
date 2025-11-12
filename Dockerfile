FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production

# Copy backend source
COPY backend/package.json backend/package-lock.json* ./backend/
COPY backend/src ./backend/src
COPY backend/tsconfig.json ./backend/

# Build backend
WORKDIR /app/backend
RUN npm ci
RUN npm run build

# Set working directory back
WORKDIR /app

# Expose port
EXPOSE 3001

# Start backend
CMD ["node", "backend/dist/index.js"]

