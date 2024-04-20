FROM node:20 AS builder

# Set the working directory 
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using 
RUN pnpm install --frozen-lockfile

# Copy the application source code 
COPY . .

# Build the application
RUN npm run build

# Use a lightweight Node.js image for production
FROM node:20-slim

# Set the working directory 
WORKDIR /usr/src/app

# Install pnpm in the production image
RUN npm install -g pnpm

# Install necessary dev dependencies for running tests
RUN npm install -g mocha chai sinon supertest

# Copy the build files 
COPY --from=builder /usr/src/app/dist ./dist

# Copy the necessary package files 
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml* ./

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Expose port 4000
EXPOSE 4000

# Install curl
RUN apt-get update && apt-get install -y curl

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:4000/health || exit 1

CMD ["node", "dist/app.js"]
