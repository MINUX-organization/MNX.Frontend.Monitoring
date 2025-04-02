import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_guard-layout/_notification/mining/miners',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guard-layout/mining/miners"!</div>
}
