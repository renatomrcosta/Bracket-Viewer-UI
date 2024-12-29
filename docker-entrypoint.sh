#!/bin/sh

# Replace environment variables in the built JavaScript files
for file in /usr/share/nginx/html/assets/*.js; do
  sed -i "s/import.meta.env.VITE_GRID_COLUMNS\|\"|)||4/import.meta.env.VITE_GRID_COLUMNS\|\"|)||${GRID_COLUMNS:-3}/g" $file
  sed -i "s/import.meta.env.VITE_GRID_ROWS\|\"|)||3/import.meta.env.VITE_GRID_ROWS\|\"|)||${GRID_ROWS:-3}/g" $file
  sed -i "s/import.meta.env.VITE_MAX_MATCHES\|\"|)||12/import.meta.env.VITE_MAX_MATCHES\|\"|)||${MAX_MATCHES:-9}/g" $file
done

# Execute CMD
exec "$@"