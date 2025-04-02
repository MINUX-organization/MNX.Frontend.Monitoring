import { BACKEND_HUBS } from '@/shared/constants/backend-urls';
import { TokenRefresher } from '@/shared/lib/utils/refresh-token';
import { createConnection, unregisterHandler } from '@/shared/lib/websocket';
import { RootLayout } from '@/widgets/root-layout';
import { createFileRoute, redirect } from '@tanstack/react-router';

const tokenRefresher = TokenRefresher.getInstance();

export const Route = createFileRoute('/_guard-layout')({
  component: RootLayout,
  onEnter: ({ context: { session: { get }, actions: { setStreamConnection }}}) => {
    try {
      const token = get()?.accessToken;
      const streamConnection = createConnection(BACKEND_HUBS.MONITORING, token)
      setStreamConnection(streamConnection);
    } catch(error) {
      console.log(error)
      setStreamConnection(null);
    }
  },
  onLeave: ({ context: { websockets } }) => {
    unregisterHandler(websockets?.notificationConnection, 'MiningDeviceStateChanged');
  },
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