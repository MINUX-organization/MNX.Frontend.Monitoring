import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/mining/wallets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_guard-layout/mining/wallet"!</div>
}
