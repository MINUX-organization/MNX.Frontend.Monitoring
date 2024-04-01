import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { RootLayout } from "@/widgets/root-layout";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { MonitoringPage } from "@/pages/monitoring";
import { GpusPage } from "@/pages/devices/GPUs";
import { CryptosPage } from "@/pages/cryptos";
import { WalletsPage } from "@/pages/wallets";
import { PoolsPage } from "@/pages/pools";
import PrivateRoute from "../guards/private-route";
import { LoginPage } from "@/pages/login";
import { RigsPage } from "@/pages/rigs";
import { RigPage, RigCpusInfoPage, RigGpusInfoPage, RigMotherboardInfoPage, RigHddsInfoPage, RigInternetInfoPage } from "@/pages/rig";

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.LOGIN,
    element: <LoginPage/>,
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
        element: <PrivateRoute children={<MonitoringPage />}/>
      },
      {
        path: ROUTER_PATHS.GPUS,
        element: <PrivateRoute children={<GpusPage />}/>
      },
      {
        path: ROUTER_PATHS.RIGS,
        element: <PrivateRoute children={<RigsPage />}/>
      },
      {
        path: ROUTER_PATHS.RIG,
        element: <PrivateRoute children={<RigPage />}/>,
        children: [
          {
            path: '',
            loader: () => redirect(ROUTER_PATHS.RIG_GPUS),
          },
          {
            path: ROUTER_PATHS.RIG_GPUS,
            element: <PrivateRoute children={<RigGpusInfoPage />}/>,
          },
          {
            path: ROUTER_PATHS.RIG_CPUS,
            element: <PrivateRoute children={<RigCpusInfoPage />}/>,
          },
          {
            path: ROUTER_PATHS.RIG_MOTHERBOARD,
            element: <PrivateRoute children={<RigMotherboardInfoPage />}/>,
          },
          {
            path: ROUTER_PATHS.RIG_HDDS,
            element: <PrivateRoute children={<RigHddsInfoPage />}/>,
          },
          {
            path: ROUTER_PATHS.RIG_INTERNET,
            element: <PrivateRoute children={<RigInternetInfoPage />}/>,
          },
        ]
      },
      {
        path: ROUTER_PATHS.CRYPTOS,
        element: <PrivateRoute children={<CryptosPage />}/>
      },
      {
        path: ROUTER_PATHS.WALLETS,
        element: <PrivateRoute children={<WalletsPage />}/>
      },
      {
        path: ROUTER_PATHS.POOLS,
        element: <PrivateRoute children={<PoolsPage />}/>
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}