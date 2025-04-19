import { ErrorPage } from '@/app/error.page';
import { registerHandler, unregisterHandler, useSignalR } from '@/shared/lib/websocket';
import { HubConnectionState } from '@microsoft/signalr';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_guard-layout/_notification')({
  component: RouteComponent,
  errorComponent: ErrorPage
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
      () => {
        const location = window.location.pathname;
        
        if (location.includes('flight-sheets')) {
          queryClient.invalidateQueries({ queryKey: ['flightsheet-devices'] })
        }
        if (location.includes('devices')) {
          queryClient.invalidateQueries({ queryKey: ['gpus']})
          queryClient.invalidateQueries({ queryKey: ['cpus']})
        }
      },
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