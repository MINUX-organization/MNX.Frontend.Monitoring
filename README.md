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
  --build-arg VITE_BACKEND_PORT=1111 \
  --build-arg VITE_BACKEND_DNS='localhost' \
  --build-arg VITE_BACKEND_SECURITY='security' \
  --build-arg VITE_BACKEND_MONITORING='monitoring' \
  -t web-monitoring-frontend-app .

docker run -d --name web-monitoring-frontend -p 3000:3000 -e VITE_FRONTEND_PORT=3000 web-monitoring-frontend-app
```