import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/setup/presets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guard-layout/setup/preset"!</div>
}
