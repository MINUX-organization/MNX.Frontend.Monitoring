import { useSignalR } from '@/shared/lib/websocket';
import { HubConnectionState } from '@microsoft/signalr'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_guard-layout/_notification/_streams')({
  component: RouteComponent,
})

function RouteComponent() {
  const { streamConnection } = useSignalR();
    
  useEffect(() => {
    return() => {
      if (streamConnection?.state !== HubConnectionState.Connected) return;

      streamConnection?.stop();
    }
  }, [streamConnection])

  return (
    <Outlet />
  )
}