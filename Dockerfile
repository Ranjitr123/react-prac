# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
# Production stage
# Production stage
FROM httpd:2.4-alpine

# Remove default apache files
RUN rm -rf /usr/local/apache2/htdocs/*

# Copy build artifacts
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Copy .htaccess for SPA routing
COPY .htaccess /usr/local/apache2/htdocs/

# Configure Apache: Enable mod_rewrite and AllowOverride for .htaccess
RUN sed -i \
    -e 's/^#\(LoadModule rewrite_module modules\/mod_rewrite.so\)/\1/' \
    -e 's/AllowOverride None/AllowOverride All/g' \
    /usr/local/apache2/conf/httpd.conf

EXPOSE 80
CMD ["httpd-foreground"]
