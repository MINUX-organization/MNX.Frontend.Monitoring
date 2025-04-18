# Stage 1: Build the frontend application
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Create the production image with Nginx
FROM nginx:alpine as production

ARG VITE_FRONTEND_PORT = 3100
ENV VITE_FRONTEND_PORT=${VITE_FRONTEND_PORT}

RUN apk add --no-cache gettext openssl

COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

COPY --from=builder /app/dist /usr/share/nginx/html

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE ${VITE_FRONTEND_PORT}

ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]