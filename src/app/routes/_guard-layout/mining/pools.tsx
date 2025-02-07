import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/mining/pools')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guard-layout/mining/pools"!</div>
}
