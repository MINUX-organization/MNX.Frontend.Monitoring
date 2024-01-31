import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { RootLayout } from "@/widgets/root-layout";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { Monitoring } from "@/pages/Monitoring";
import { Gpus } from "@/pages/Devices/GPUs";

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.HOME,
    element: <RootLayout/>,
    children: [
      {
        path: '',
        loader: () => redirect(ROUTER_PATHS.MONITORING),
      },
      {
        path: 'devices',
        loader: () => redirect(ROUTER_PATHS.GPUS),
      },
      {
        path: ROUTER_PATHS.MONITORING,
        element: <Monitoring/>,
      },
      {
        path: ROUTER_PATHS.GPUS,
        element: <Gpus/>,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}