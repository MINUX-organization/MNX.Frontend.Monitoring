import { registerHandler, unregisterHandler, useSignalR } from '@/shared/lib/websocket';
import { HubConnectionState } from '@microsoft/signalr';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_guard-layout/_notification')({
  component: RouteComponent,
})

function RouteComponent() {
  const { notificationConnection } = useSignalR();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (notificationConnection?.state !== HubConnectionState.Disconnected) return;

    notificationConnection?.start();
    registerHandler(
      notificationConnection,
      'MiningDeviceStateChanged',
      () => queryClient.refetchQueries({ queryKey: ['devices'] }),
    );

    return () => {
      if (notificationConnection?.state !== HubConnectionState.Connected) return;

      notificationConnection?.stop();
      unregisterHandler(
        notificationConnection,
        'MiningDeviceStateChanged',
      )
    }
  }, [notificationConnection, queryClient])

  return (
    <Outlet />
  )
}