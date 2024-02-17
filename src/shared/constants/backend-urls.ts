const BACKEND_DNS = import.meta.env.VITE_BACKEND_DNS;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
const BACKEND_URL = `http://${BACKEND_DNS}:${BACKEND_PORT}`;

export const BACKEND_APIS = {
  HUB_MONITORING: `${BACKEND_URL}/hubs/monitoring`,
} as const