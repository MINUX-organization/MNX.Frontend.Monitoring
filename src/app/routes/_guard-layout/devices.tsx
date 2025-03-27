import { devicesStreamStore } from '@/entities/devices'
import { SubscriptionType } from '@/shared/constants/subscription-type'
import { useStartStream } from '@/shared/lib/websocket'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/devices')({
  staleTime: Infinity,
  component: RouteComponent,
})

function RouteComponent() {
  const { setDevicesIndicators } = devicesStreamStore();
  useStartStream('Subscribe', SubscriptionType.Devices, setDevicesIndicators)

  return <Outlet />
}
