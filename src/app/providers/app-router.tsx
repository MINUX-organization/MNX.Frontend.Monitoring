import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { sessionRepository } from "@/entities/session";

const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  context: {
    session: {
      get: undefined!,
      mutation: undefined!,
    },
  },
});

const { sessionQuery, useSessionMutation } = sessionRepository;

export function AppRouterProvider() {
  const mutatuion = useSessionMutation();

  return <RouterProvider router={router} context={{ session: { get: sessionQuery, mutation: mutatuion }}}/>;
}