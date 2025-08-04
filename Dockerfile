# Use official Node.js image
FROM node:22.17-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Set environment variables (optional)
ENV NODE_ENV=production

# Start Next.js in production mode
CMD ["npm", "start"]
