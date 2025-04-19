import { poolQueryOptions } from '@/entities/pool'
import { PoolsPage } from '@/pages/pools'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_guard-layout/_notification/mining/pools',
)({
  component: PoolsPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(poolQueryOptions)
  },
})
