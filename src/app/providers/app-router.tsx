import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { RootLayout } from "@/widgets/root-layout";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import PrivateRoute from "../guards/private-route";
import React from "react";
import { UiSpinner } from "@/shared/ui/ui-spinner";

// Динамический импорт страниц
const MonitoringPage = React.lazy(() => import("@/pages/monitoring").then(module => ({ default: module.MonitoringPage })));
const GpusPage = React.lazy(() => import("@/pages/devices/GPUs").then(module => ({ default: module.GpusPage })));
const CryptosPage = React.lazy(() => import("@/pages/cryptos").then(module => ({ default: module.CryptosPage })));
const WalletsPage = React.lazy(() => import("@/pages/wallets").then(module => ({ default: module.WalletsPage })));
const PoolsPage = React.lazy(() => import("@/pages/pools").then(module => ({ default: module.PoolsPage })));
const LoginPage = React.lazy(() => import("@/pages/login").then(module => ({ default: module.LoginPage })));
const RigsPage = React.lazy(() => import("@/pages/rigs").then(module => ({ default: module.RigsPage })));
const RigPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigPage })));
const RigCpusInfoPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigCpusInfoPage })));
const RigGpusInfoPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigGpusInfoPage })));
const RigMotherboardInfoPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigMotherboardInfoPage })));
const RigHddsInfoPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigHddsInfoPage })));
const RigInternetInfoPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigInternetInfoPage })));
const CpusPage = React.lazy(() => import("@/pages/devices/CPUs").then(module => ({ default: module.CpusPage })));
const PresetModal = React.lazy(() => import("@/widgets/preset-modal").then(module => ({ default: module.PresetModal })));

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.LOGIN,
    element: (
      <React.Suspense fallback={<UiSpinner />}>
        <LoginPage />
      </React.Suspense>
    ),
  },
  {
    path: ROUTER_PATHS.HOME,
    element: (
      <React.Suspense fallback={<UiSpinner />}>
        <RootLayout />
      </React.Suspense>
    ),
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
        element: (
          <PrivateRoute>
            <React.Suspense fallback={<UiSpinner />}>
              <MonitoringPage />
            </React.Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: ROUTER_PATHS.GPUS,
        element: (
          <PrivateRoute>
            <React.Suspense fallback={<UiSpinner />}>
              <GpusPage />
            </React.Suspense>
          </PrivateRoute>
        ),
        children: [
          {
            path: ROUTER_PATHS.GPU,
            element: (
              <PrivateRoute>
                <React.Suspense fallback={<UiSpinner />}>
                  <PresetModal />
                </React.Suspense>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: ROUTER_PATHS.CPUS,
        element: (
          <PrivateRoute>
            <React.Suspense fallback={<UiSpinner />}>
              <CpusPage />
            </React.Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: ROUTER_PATHS.RIGS,
        element: (
          <PrivateRoute>
            <React.Suspense fallback={<UiSpinner />}>
              <RigsPage />
            </React.Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: ROUTER_PATHS.RIG,
        element: (
          <PrivateRoute>
            <React.Suspense fallback={<UiSpinner />}>
              <RigPage />
            </React.Suspense>
          </PrivateRoute>
        ),
        children: [
          {
            path: '',
            loader: () => redirect(ROUTER_PATHS.RIG_GPUS),
          },
          {
            path: ROUTER_PATHS.RIG_GPUS,
            element: (
              <PrivateRoute>
                <React.Suspense fallback={<UiSpinner />}>
                  <RigGpusInfoPage />
                </React.Suspense>
                </PrivateRoute>
            ),
          },
          {
            path: ROUTER_PATHS.RIG_CPUS,
            element: (
              <PrivateRoute>
                <React.Suspense fallback={<UiSpinner />}>
                  <RigCpusInfoPage />
                </React.Suspense>
              </PrivateRoute>
            ),
          },
          {
            path: ROUTER_PATHS.RIG_MOTHERBOARD,
            element: (
              <PrivateRoute>
                <React.Suspense fallback={<UiSpinner />}>
                  <RigMotherboardInfoPage />
                </React.Suspense>
              </PrivateRoute>
            ),
          },
          {
            path: ROUTER_PATHS.RIG_HDDS,
            element: (
              <PrivateRoute>
                <React.Suspense fallback={<UiSpinner />}>
                  <RigHddsInfoPage />
                </React.Suspense>
              </PrivateRoute>
            ),
          },
          {
            path: ROUTER_PATHS.RIG_INTERNET,
            element: (
              <PrivateRoute>
                <React.Suspense fallback={<UiSpinner />}>
                  <RigInternetInfoPage />
                </React.Suspense>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: ROUTER_PATHS.CRYPTOS,
        element: (
          <PrivateRoute>
            <React.Suspense fallback={<UiSpinner />}>
              <CryptosPage />
            </React.Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: ROUTER_PATHS.WALLETS,
        element: (
          <PrivateRoute>
            <React.Suspense fallback={<UiSpinner />}>
              <WalletsPage />
            </React.Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: ROUTER_PATHS.POOLS,
        element: (
          <PrivateRoute>
            <React.Suspense fallback={<UiSpinner />}>
              <PoolsPage />
            </React.Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}