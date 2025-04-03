import { devicesStreamStore } from '@/entities/devices'
import { SubscriptionType } from '@/shared/constants/subscription-type'
import { startStream, useSignalR } from '@/shared/lib/websocket'
import { HubConnectionState } from '@microsoft/signalr'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useCallback, useEffect } from 'react'

export const Route = createFileRoute(
  '/_guard-layout/_notification/_streams/devices',
)({
  component: RouteComponent,
})

export function RouteComponent() {
  const { streamConnection } = useSignalR();
  const { setDevicesIndicators } = devicesStreamStore();

  const startStreamFunc = useCallback(
    () => {
      return startStream(
        streamConnection, 
        'Subscribe', 
        SubscriptionType.Devices, 
        setDevicesIndicators
      );
    },
    [streamConnection, setDevicesIndicators]
  )

  useEffect(() => {
    if (streamConnection?.state !== HubConnectionState.Disconnected) {
      startStreamFunc();

      return;
    };

    streamConnection?.start()
      .then(() => startStreamFunc())

    return () => {
      // streamConnection?.send('Unsubscribe');
      // sub.then((s: ISubscription<any> | undefined) => s?.dispose());
    }
  }, [setDevicesIndicators, startStreamFunc, streamConnection])

  return (
    <Outlet />
  )
}