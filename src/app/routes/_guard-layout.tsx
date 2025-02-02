import { SessionType } from '@/entities/session'
import { refreshTokensApi } from '@/shared/api'
import { RootLayout } from '@/widgets/root-layout'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout')({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const contextTyped = context as { session: { get: SessionType, set: (session: SessionType) => void } }

    if (contextTyped.session.get) {
      if (contextTyped.session.get.refreshExpiration < Date.now().toString()) {
        const response = await refreshTokensApi(contextTyped.session.get.refreshToken)
        contextTyped.session.set(response.data);
        return;
      }

      return;
    }

    throw redirect({
      to: '/login',
      search: {
        redirect: location.href,
      },
    })
  }
})

function RouteComponent() {
  return <RootLayout />
}