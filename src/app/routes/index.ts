import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  // beforeLoad: () => redirect({ to: '/monitoring' }),
  beforeLoad: () => redirect({ to: '/rigs' }),
})