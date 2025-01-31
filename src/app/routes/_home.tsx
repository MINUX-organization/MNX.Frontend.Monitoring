import { RootLayout } from '@/widgets/root-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RootLayout />
}
