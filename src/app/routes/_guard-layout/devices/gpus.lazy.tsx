import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_guard-layout/devices/gpus')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/devices/gpus"!</div>
}
