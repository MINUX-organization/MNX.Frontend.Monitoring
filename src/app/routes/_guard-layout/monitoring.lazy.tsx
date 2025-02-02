import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_guard-layout/monitoring')({
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
})

function RouteComponent() {
  return <div>яблоко</div>
}
