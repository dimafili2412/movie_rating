# Base image
FROM node:lts

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=443

# Expose the application's port
EXPOSE 443

# Default command
CMD ["npm", "run", "start:prod"]
