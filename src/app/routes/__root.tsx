import { SessionType } from '@/entities/session';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AxiosResponse } from 'axios';

interface RouterContext {
  session: {
    get: () => SessionType | undefined;
    mutation: { refreshSession: (refreshToken: string) => Promise<AxiosResponse<SessionType>> };
  }
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <RouteComponent />,
})

export function RouteComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}