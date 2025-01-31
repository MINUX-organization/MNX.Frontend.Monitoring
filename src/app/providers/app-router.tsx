import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!,
  },
});

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}