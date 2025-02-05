import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/devices/cpus')({
  component: RouteComponent,
  loader: async () => {
    console.log('3')
  }
})

function RouteComponent() {
  console.log('1')
  return (
    <div>
      Hello "/_layout/devices/cpus"! <Link to="/registration">gpus</Link>
    </div>
  )
}
