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
docker build \
  --build-arg VITE_BACKEND_URL='http://localhost' \
  --build-arg VITE_BACKEND_SECURITY='security' \
  --build-arg VITE_BACKEND_MONITORING='rigs_api' \
  -t web-monitoring-frontend-app .

docker run -d --name web-monitoring-frontend -p 3111:3111 -e VITE_FRONTEND_PORT=3111 web-monitoring-frontend-app
```
