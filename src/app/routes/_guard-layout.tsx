import { TokenRefresher } from '@/shared/lib/utils/refresh-token';
import { RootLayout } from '@/widgets/root-layout';
import { createFileRoute, redirect } from '@tanstack/react-router';

const tokenRefresher = TokenRefresher.getInstance();

export const Route = createFileRoute('/_guard-layout')({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const session = context.session.get();

    if (!session) {
      throw redirectToLogin(location.href);
    }

    try {
      await tokenRefresher.checkAndRefresh(
        session.accessToken,
        session.refreshToken,
        context.session.mutation.refreshSession,
        () => {},
        () => {
          localStorage.removeItem('session');
          throw redirectToLogin(location.href);
        }
      );

      const newSession = context.session.get();
      if (!newSession) {
        throw new Error('Session not found after refresh');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('session');
      throw redirectToLogin(location.href);
    }
  },
});

function redirectToLogin(redirectUrl: string) {
  return redirect({
    to: '/login',
    search: { redirect: redirectUrl },
  });
}

function RouteComponent() {
  return <RootLayout />;
}