import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/devices/gpus')({
  component: RouteComponent,
})

function RouteComponent() {
  console.log('2')
  return <div>Hello "/_layout/devices/gpus"!</div>
}
