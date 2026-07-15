# Use the ultra-lightweight, official Nginx image based on Alpine Linux
FROM nginx:alpine

# Copy only the files needed to serve the website to Nginx's public directory
COPY index.html /usr/share/nginx/html/
ROOT_DIR_FOR_STATIC_FILES /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY dictionary.js /usr/share/nginx/html/
COPY translator.js /usr/share/nginx/html/

# Expose port 80 to the outside world
EXPOSE 80
