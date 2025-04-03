import { BACKEND_HUBS } from '@/shared/constants/backend-urls'
import { createConnection } from '@/shared/lib/websocket'
import { HubConnectionState } from '@microsoft/signalr'
import { createFileRoute } from '@tanstack/react-router'
import includes from 'lodash/includes'

let isDeviceStreamConnected = false;

export const Route = createFileRoute('/_guard-layout/_notification/_streams')({
  beforeLoad: async ({ context: { session: { get }, actions: { setStreamConnection }},  location}) => {
    if (!includes(location.href, window.location.pathname)) return;

    const token = get()?.accessToken;

    if (!isDeviceStreamConnected) {
      const streamConnection = createConnection(BACKEND_HUBS.MONITORING, token)
      await streamConnection?.start()
      setStreamConnection(streamConnection);
      isDeviceStreamConnected = true
      return;
    }
  },
  onLeave: ({ context: { websockets: { streamConnection }, actions: { setStreamConnection }}}) => {
    if (streamConnection?.state === HubConnectionState.Connected) {
      streamConnection?.stop()
      setStreamConnection(null);
      isDeviceStreamConnected = false
    }
  },
})