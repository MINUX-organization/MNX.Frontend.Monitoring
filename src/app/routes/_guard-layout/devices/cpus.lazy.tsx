import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_guard-layout/devices/cpus')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_layout/devices/cpus"! <Link to="/registration">gpus</Link>
    </div>
  )
}
