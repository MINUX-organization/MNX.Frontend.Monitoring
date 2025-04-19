import { DevicesIndicatorsType } from '@/entities/devices';
import { SessionType } from '@/entities/session';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AxiosResponse } from 'axios';

interface RouterContext {
  queryClient: QueryClient;
  session: {
    get: () => SessionType | undefined;
    mutation: { refreshSession: (refreshToken: string) => Promise<AxiosResponse<SessionType>> };
  };
  actions: {
    setDevicesIndicators: (item: DevicesIndicatorsType) => void
  }
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <RouteComponent />,
})

export function RouteComponent() {
  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </>
  )
}