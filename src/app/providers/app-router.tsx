import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { sessionRepository } from "@/entities/session";
import { queryClient } from "./app-query";
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
    actions: {
      setDevicesIndicators: undefined!,
    },
  },
});

const { sessionQuery, useSessionMutation } = sessionRepository;

export function AppRouterProvider() {
  const mutatuion = useSessionMutation();
  const { setDevicesIndicators } = devicesStreamStore()

  return <RouterProvider
    router={router} 
    context={{ 
      session: { get: sessionQuery, mutation: mutatuion },
      actions: { setDevicesIndicators },
    }}
  />;
}