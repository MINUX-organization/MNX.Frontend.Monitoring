import { gpusQueryOptions } from '@/entities/devices';
import { sessionRepository } from '@/entities/session'
import { GpusPage } from '@/pages/devices'
import { BACKEND_HUBS } from '@/shared/constants/backend-urls';
import { SignalRProvider } from '@/shared/lib/providers/signal-r-provider';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/devices/gpus')({
  preloadStaleTime: 0,
  component: GpusPageWrapper,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(gpusQueryOptions)
  }
})

const { sessionQuery } = sessionRepository;

function GpusPageWrapper() {
  const session = sessionQuery();
  
  return (
    <SignalRProvider route={BACKEND_HUBS.MONITORING} token={session?.accessToken ?? ''}>
      <GpusPage />
    </SignalRProvider>
  )
}