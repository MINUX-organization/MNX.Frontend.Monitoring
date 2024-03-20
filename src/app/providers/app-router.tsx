import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { RootLayout } from "@/widgets/root-layout";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { Monitoring } from "@/pages/monitoring";
import { Gpus } from "@/pages/devices/GPUs";
import { Cryptos } from "@/pages/cryptos";
import { Wallets } from "@/pages/wallets";
import { Pools } from "@/pages/pools";

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
        path: ROUTER_PATHS.DEVICES,
        loader: () => redirect(ROUTER_PATHS.GPUS),
      },
      {
        path: ROUTER_PATHS.MONITORING,
        element: <Monitoring />,
      },
      {
        path: ROUTER_PATHS.GPUS,
        element: <Gpus />,
      },
      {
        path: ROUTER_PATHS.CRYPTOS,
        element: <Cryptos />,
      },
      {
        path: ROUTER_PATHS.WALLETS,
        element: <Wallets />
      },
      {
        path: ROUTER_PATHS.POOLS,
        element: <Pools />
      }
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}