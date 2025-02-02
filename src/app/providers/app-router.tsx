import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { sessionRepository } from "@/entities/session";

const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  context: {
    session: {
      get: undefined!,
      set: undefined!,
    },
  },
});

const { useSessionQuery, useSessionMutation } = sessionRepository;

export function AppRouterProvider() {
  const { data: session } = useSessionQuery();
  const { setSession } = useSessionMutation();

  return <RouterProvider router={router} context={{ session: { get: session, set: setSession }}}/>;
}