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
import PrivateRoute from "../guards/private-route";
import { Login } from "@/pages/login";
import { Rigs } from "@/pages/rigs";

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.LOGIN,
    element: <Login/>,
  },
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
        element: <PrivateRoute children={<Monitoring />}/>
      },
      {
        path: ROUTER_PATHS.GPUS,
        element: <PrivateRoute children={<Gpus />}/>
      },
      {
        path: ROUTER_PATHS.RIGS,
        element: <PrivateRoute children={<Rigs />}/>
      },
      {
        path: ROUTER_PATHS.CRYPTOS,
        element: <PrivateRoute children={<Cryptos />}/>
      },
      {
        path: ROUTER_PATHS.WALLETS,
        element: <PrivateRoute children={<Wallets />}/>
      },
      {
        path: ROUTER_PATHS.POOLS,
        element: <PrivateRoute children={<Pools />}/>
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}