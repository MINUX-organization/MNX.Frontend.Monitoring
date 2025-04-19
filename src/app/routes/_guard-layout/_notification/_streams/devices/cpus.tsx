import { cpusQueryOptions } from '@/entities/devices'
import { CpusPage } from '@/pages/devices'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_guard-layout/_notification/_streams/devices/cpus',
)({
  preloadStaleTime: 10000,
  component: CpusPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(cpusQueryOptions)
  },
})
