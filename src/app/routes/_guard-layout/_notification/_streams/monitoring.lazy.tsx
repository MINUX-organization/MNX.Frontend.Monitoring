// import { sessionRepository } from '@/entities/session';
// import { MonitoringPage } from '@/pages/monitoring';
// import { BACKEND_HUBS } from '@/shared/constants/backend-urls';
// import { SignalRProvider } from '@/shared/lib/providers/signal-r-provider';
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_guard-layout/_notification/_streams/monitoring',
)({
  component: MonitoringPageWrapper,
})

// const { sessionQuery } = sessionRepository;

function MonitoringPageWrapper() {
  // const session = sessionQuery();

  return (
    <></>
    // <SignalRProvider route={BACKEND_HUBS.MONITORING} token={session?.accessToken ?? ''}>
    //   <MonitoringPage />
    // </SignalRProvider>
  )
}
