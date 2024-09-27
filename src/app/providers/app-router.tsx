import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import _ from "lodash";
import React from "react";
import PrivateRoute from "../guards/private-route";
import { RootLayout } from "@/widgets/root-layout";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { LoginPage } from "@/pages/login";
import { CryptosPage } from "@/pages/cryptos";
import { WalletsPage } from "@/pages/wallets";
import { PoolsPage } from "@/pages/pools";
import { PresetPage } from "@/pages/preset";
import { PresetModal } from "@/widgets/preset-modal";

const MonitoringPage = React.lazy(() => import("@/pages/monitoring").then(module => ({ default: module.MonitoringPage })));
const GpusPage = React.lazy(() => import("@/pages/devices/GPUs").then(module => ({ default: module.GpusPage })));
const RigsPage = React.lazy(() => import("@/pages/rigs").then(module => ({ default: module.RigsPage })));
const RigPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigPage })));
const RigCpusInfoPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigCpusInfoPage })));
const RigGpusInfoPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigGpusInfoPage })));
const RigMotherboardInfoPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigMotherboardInfoPage })));
const RigHddsInfoPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigHddsInfoPage })));
const RigInternetInfoPage = React.lazy(() => import("@/pages/rig").then(module => ({ default: module.RigInternetInfoPage })));
const FlightSheetsPage = React.lazy(() => import("@/pages/flightsheets").then(module => ({ default: module.FlightSheetsPage })));
const CpusPage = React.lazy(() => import("@/pages/devices/CPUs").then(module => ({ default: module.CpusPage })));

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.LOGIN,
    element: (
        <LoginPage />
    ),
  },
  {
    path: ROUTER_PATHS.HOME,
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
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
            <React.Suspense fallback={<UiSpinner />}>
              <MonitoringPage />
            </React.Suspense>
        ),
      },
      {
        path: ROUTER_PATHS.GPUS,
        element: (
            <React.Suspense fallback={<UiSpinner />}>
              <GpusPage />
            </React.Suspense>
        ),
        children: [
          {
            path: ROUTER_PATHS.GPU,
            element: (
                  <PresetModal />
            ),
          },
        ],
      },
      {
        path: ROUTER_PATHS.CPUS,
        element: (
            <React.Suspense fallback={<UiSpinner />}>
              <CpusPage />
            </React.Suspense>
        ),
      },
      {
        path: ROUTER_PATHS.RIGS,
        element: (
            <React.Suspense fallback={<UiSpinner />}>
              <RigsPage />
            </React.Suspense>
        ),
      },
      {
        path: ROUTER_PATHS.RIG,
        element: (
            <React.Suspense fallback={<UiSpinner />}>
              <RigPage />
            </React.Suspense>
        ),
        children: [
          {
            path: '',
            loader: () => redirect(ROUTER_PATHS.RIG_GPUS),
          },
          {
            path: ROUTER_PATHS.RIG_GPUS,
            element: (
                <React.Suspense fallback={<UiSpinner />}>
                  <RigGpusInfoPage />
                </React.Suspense>
            ),
          },
          {
            path: ROUTER_PATHS.RIG_CPUS,
            element: (
                <React.Suspense fallback={<UiSpinner />}>
                  <RigCpusInfoPage />
                </React.Suspense>
            ),
          },
          {
            path: ROUTER_PATHS.RIG_MOTHERBOARD,
            element: (
                <React.Suspense fallback={<UiSpinner />}>
                  <RigMotherboardInfoPage />
                </React.Suspense>
            ),
          },
          {
            path: ROUTER_PATHS.RIG_HDDS,
            element: (
                <React.Suspense fallback={<UiSpinner />}>
                  <RigHddsInfoPage />
                </React.Suspense>
            ),
          },
          {
            path: ROUTER_PATHS.RIG_INTERNET,
            element: (
                <React.Suspense fallback={<UiSpinner />}>
                  <RigInternetInfoPage />
                </React.Suspense>
            ),
          },
        ],
      },
      {
        path: ROUTER_PATHS.FLIGHT_SHEETS,
        element: (
            <React.Suspense fallback={<UiSpinner />}>
              <FlightSheetsPage />
            </React.Suspense>
        ),
      },
      {
        path: ROUTER_PATHS.PRESETS,
        element: (
              <PresetPage />
        ),
        children: [
          {
            path: ROUTER_PATHS.CONFIG,
            element: (
                <PresetModal />
            ),
          },
        ],
      },
      {
        path: ROUTER_PATHS.CRYPTOS,
        element: (
              <CryptosPage />
        ),
      },
      {
        path: ROUTER_PATHS.WALLETS,
        element: (
              <WalletsPage />
        ),
      },
      {
        path: ROUTER_PATHS.POOLS,
        element: (
              <PoolsPage />
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}