import { BACKEND_HUBS } from '@/shared/constants/backend-urls'
import { createConnection } from '@/shared/lib/websocket'
import { HubConnectionState } from '@microsoft/signalr'
import { createFileRoute } from '@tanstack/react-router'
import _ from 'lodash'

export const Route = createFileRoute('/_guard-layout/_notification/_streams')({
  beforeLoad: async ({ context: { session: { get }, websockets: { streamConnection }, actions: { setStreamConnection }},  location}) => {
    if (!_.includes(location.href, window.location.pathname)) return;

    if (streamConnection === null) {
      const token = get()?.accessToken;
      const streamConnection = createConnection(BACKEND_HUBS.MONITORING, token)
      await streamConnection?.start()
      setStreamConnection(streamConnection);
      return;
    }

    if (streamConnection?.state === HubConnectionState.Disconnected) {
      await streamConnection?.start()
      return;
    }

  },
  onLeave: ({ context: { websockets: { streamConnection }, actions: { setStreamConnection }}}) => {
    if (streamConnection?.state === HubConnectionState.Connected) {
      streamConnection?.stop()
    }

    setStreamConnection(null);
  },
})