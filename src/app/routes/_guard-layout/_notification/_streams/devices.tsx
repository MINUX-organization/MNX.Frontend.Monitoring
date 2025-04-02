import { SubscriptionType } from '@/shared/constants/subscription-type'
import { startStream } from '@/shared/lib/websocket'
import { HubConnectionState, ISubscription } from '@microsoft/signalr'
import { createFileRoute } from '@tanstack/react-router'

let streamDeviceSubscriber: ISubscription<unknown> | undefined = undefined
let isDevicesStreaming = false

export const Route = createFileRoute(
  '/_guard-layout/_notification/_streams/devices',
)({
  preload: false,
  loader: async ({ context: { websockets: { streamConnection }, actions: { setDevicesIndicators }}}) => {
    if (isDevicesStreaming) return

    if (streamConnection?.state === HubConnectionState.Connected) {
      streamDeviceSubscriber = startStream(streamConnection, 'Subscribe', SubscriptionType.Devices, setDevicesIndicators)
    }

    isDevicesStreaming = true
  },
  onLeave: ({ context: { websockets: { streamConnection }}}) => {
    streamConnection?.send('Unsubscribe')
    streamDeviceSubscriber?.dispose()
    streamDeviceSubscriber = undefined
    isDevicesStreaming = false
  },
})