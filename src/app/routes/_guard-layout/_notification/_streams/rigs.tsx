import { rigsQueryOptions } from '@/entities/rig'
import { RigsPage } from '@/pages/rigs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_guard-layout/_notification/_streams/rigs',
)({
  preloadStaleTime: 0,
  component: RigsPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(rigsQueryOptions)
  },
})
