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

FROM node:20

# Set the working directory 
WORKDIR /usr/src/app

# Install pnpm in the production image
RUN npm install -g pnpm

# Copy all files from the builder stage
COPY --from=builder /usr/src/app/ .

# Install production dependencies
RUN pnpm install  --ignore-scripts

# Expose port 4000
EXPOSE 4000

# CMD instruction
CMD ["node", "dist/app.js"]
