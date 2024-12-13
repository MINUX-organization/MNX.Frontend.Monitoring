import { create } from "zustand";

type FLightSheetSelectDevicesState = {
  devicesIds: Map<string, Set<string>>;
  devicesIdsCopy: Map<string, Set<string>>;
}

type FLightSheetSelectDevicesActions = {
  setDevicesIds: (devicesIds: Map<string, Set<string>>) => void;
  setDevicesIdsCopy: (devicesIds: Map<string, Set<string>>) => void;
}

export const useFlightSheetSelectDevicesStore = create<FLightSheetSelectDevicesState & FLightSheetSelectDevicesActions>((set) => ({
  devicesIds: new Map(),
  devicesIdsCopy: new Map(),
  setDevicesIds: (devicesIds: Map<string, Set<string>>) => set({devicesIds}),
  setDevicesIdsCopy: (devicesIds: Map<string, Set<string>>) => set({devicesIdsCopy: devicesIds}),
}))