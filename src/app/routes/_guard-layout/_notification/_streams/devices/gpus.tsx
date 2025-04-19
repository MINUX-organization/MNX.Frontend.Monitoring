import { gpusQueryOptions } from '@/entities/devices'
import { GpusPage } from '@/pages/devices'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_guard-layout/_notification/_streams/devices/gpus',
)({
  preloadStaleTime: 0,
  component: GpusPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(gpusQueryOptions)
  },
})
