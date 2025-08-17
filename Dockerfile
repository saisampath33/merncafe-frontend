FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install axios@^1.10.0 cloudinary@^2.7.0 cors@^2.8.5 react@^19.1.0 react-dom@^19.1.0 react-icons@^5.5.0 react-router-dom@^7.6.3 react-toastify@^11.0.5 vite-plugin-pwa@^1.0.1 
# Copy the rest of your app
COPY . .

# Build the React app
RUN npm run build



# nginx
# httpd
# Expose port
EXPOSE 5173 

# Serve the app
CMD ["npm","run","dev"]
