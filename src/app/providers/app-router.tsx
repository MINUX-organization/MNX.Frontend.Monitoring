import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { sessionRepository } from "@/entities/session";
import { queryClient } from "./app-query";
import { websocketStore } from "@/shared/lib/websocket/websocket.store";
import { devicesStreamStore } from "@/entities/devices";

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadDelay: 100,
  context: {
    queryClient,
    session: {
      get: undefined!,
      mutation: undefined!,
    },
    websockets: undefined!,
    actions: {
      setDevicesIndicators: undefined!,
      setStreamConnection: undefined!,
      setNotificationConnection: undefined!,
    },
  },
});

const { sessionQuery, useSessionMutation } = sessionRepository;

export function AppRouterProvider() {
  const mutatuion = useSessionMutation();
  const { setDevicesIndicators } = devicesStreamStore()
  const { 
    setStreamConnection, 
    setNotificationConnection, 
    streamConnection, 
    notificationConnection } = websocketStore();

  return <RouterProvider
    router={router} 
    context={{ 
      session: { get: sessionQuery, mutation: mutatuion },
      websockets: { streamConnection, notificationConnection },
      actions: { setStreamConnection, setNotificationConnection, setDevicesIndicators },
    }}
  />;
}