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
  --build-arg VITE_BACKEND_URL='localhost' \
  --build-arg VITE_BACKEND_SECURITY='monitoring_center_security' \
  --build-arg VITE_BACKEND_MONITORING='monitoring_center_monitoring' \
  -t web-monitoring-frontend-app .

docker run -d --name web-monitoring-frontend -p 3100:3100 -e VITE_FRONTEND_PORT=3100 web-monitoring-frontend-app
```