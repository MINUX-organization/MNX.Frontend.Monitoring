import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/registration')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/registration"!</div>
}
