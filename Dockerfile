FROM node:20-alpine

WORKDIR /app

# Copy backend files
COPY backend/package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Build backend
RUN npm run build

# Expose port
EXPOSE 3001

# Start backend
CMD ["node", "dist/index.js"]
