import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/setup/flight-sheets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guard-layout/setup/flight-sheets"!</div>
}
