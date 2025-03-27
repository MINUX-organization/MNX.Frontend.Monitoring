import { cpusQueryOptions } from '@/entities/devices'
import { CpusPage } from '@/pages/devices'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/devices/cpus')({
  preloadStaleTime: 0,
  component: CpusPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(cpusQueryOptions)
  }
})
