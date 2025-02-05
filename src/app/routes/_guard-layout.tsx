import { isSuccessResponse } from '@/shared/api'
import { RootLayout } from '@/widgets/root-layout'
import { createFileRoute, redirect } from '@tanstack/react-router'
import _ from 'lodash';

export const Route = createFileRoute('/_guard-layout')({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const session = context.session.get();

    if (!session) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    try {
      const payload = JSON.parse(atob(_.split(session.accessToken, '.')[1]));

      if (new Date(payload.exp * 1000).getTime() < Date.now()) {
        const response = await context.session.mutation.refreshSession(session.refreshToken);
        if (!isSuccessResponse(response)) {
          localStorage.removeItem('session');
          throw redirect({
            to: '/login',
            search: {
              redirect: location.href,
            },
          })
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      localStorage.removeItem('session');
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }


  },
})

function RouteComponent() {
  return <RootLayout />
}