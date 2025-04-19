#!/bin/sh
set -e

REQUIRED_VARS='${VITE_FRONTEND_PORT} ${VITE_BACKEND_URL} ${VITE_BACKEND_SECURITY} ${VITE_BACKEND_MONITORING}' 

envsubst "$REQUIRED_VARS" < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf

echo "--- Generated Nginx Configuration ---"
cat /etc/nginx/nginx.conf
echo "-------------------------------------"

nginx -t

CONFIG_FILE="/usr/share/nginx/html/config.js"
echo "Generating runtime config for frontend at $CONFIG_FILE..."

cat <<EOF > "$CONFIG_FILE"
window.__RUNTIME_CONFIG__ = {
  backendUrl: "${VITE_BACKEND_URL}",
  backendSecurity: "${VITE_BACKEND_SECURITY}",
  backendMonitoring: "${VITE_BACKEND_MONITORING}"
};
EOF

echo "--- Generated Frontend Runtime Configuration ---"
cat "$CONFIG_FILE"
echo "------------------------------------------------"

exec "$@"