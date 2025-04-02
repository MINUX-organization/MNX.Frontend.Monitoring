import { BACKEND_HUBS } from '@/shared/constants/backend-urls';
import { registerHandler, unregisterHandler, createConnection } from '@/shared/lib/websocket';
import { HubConnectionState } from '@microsoft/signalr';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/_notification')({
  preload: false,
  onEnter: async ({ context: { actions: { setNotificationConnection }, session: { get }, queryClient}}) => {
    const token = get()?.accessToken;

    const notificationConnection = createConnection(BACKEND_HUBS.NOTIFICATION, token)

    if (notificationConnection?.state === HubConnectionState.Disconnected) {
      await notificationConnection?.start();

      registerHandler(
        notificationConnection, 
        'MiningDeviceStateChanged', 
        () => queryClient.refetchQueries({ queryKey: ['flightsheets'] }));
    }

    setNotificationConnection(notificationConnection);
  },
  onLeave: ({ context: { websockets: { notificationConnection } } }) => {
    if (notificationConnection?.state === HubConnectionState.Connected)
      notificationConnection?.stop().finally(() => {
        unregisterHandler(notificationConnection, 'MiningDeviceStateChanged');
      });
  }
})