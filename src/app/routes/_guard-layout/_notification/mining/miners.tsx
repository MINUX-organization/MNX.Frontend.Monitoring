import { MinerPage } from '@/pages/miner'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_guard-layout/_notification/mining/miners',
)({
  component: MinerPage,
})
