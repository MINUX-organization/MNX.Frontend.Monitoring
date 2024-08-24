# Stage 1: Build the frontend application
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Create the production image with Nginx
FROM nginx:alpine

RUN apk add --no-cache gettext

COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE $VITE_FRONTEND_PORT

CMD ["sh", "-c", "envsubst '${VITE_FRONTEND_PORT}, ${VITE_BACKEND_PORT}, ${VITE_BACKEND_DNS}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && nginx -t && nginx -g 'daemon off;'"]