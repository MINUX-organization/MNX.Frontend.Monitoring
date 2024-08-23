# Frontend Monitoring

## Install

```bash
npm ci
```

## Build

```bash
npm run build
```

## Build Path

/dist

## CI / CD

```bash
docker build -t web-monitoring-frontend-app .

docker run -d --name web-monitoring-frontend -p 3000:3000 -e VITE_FRONTEND_PORT=3000 -e VITE_BACKEND_PORT=1111 -e VITE_BACKEND_DNS=localhost web-monitoring-frontend-app
```