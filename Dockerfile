FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Use a lightweight Node.js image for production
FROM node:20-slim

WORKDIR /usr/src/app

# Copy only the build files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy only the necessary package files for production
COPY --from=builder /usr/src/app/package*.json ./

RUN npm install --omit=dev --ignore-scripts 

EXPOSE 4000

CMD ["node", "dist/app.js"]
