import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/devices/cpus')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div>
      CPUS
    </div>
  )
}
