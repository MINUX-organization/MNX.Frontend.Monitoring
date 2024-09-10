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
  --build-arg BACKEND_URL='localhost' \
  --build-arg BACKEND_SECURITY='security' \
  --build-arg BACKEND_MONITORING='monitoring_center_monitoring' \
  --build-arg BACKEND_MANAGEMENT='authorization' \
  -t web-monitoring-frontend-app .

docker run -d --name web-monitoring-frontend -p 3100:3100 -e FRONTEND_PORT=3100 web-monitoring-frontend-app
```