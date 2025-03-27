import { create } from "zustand";
import { DevicesIndicatorsType } from "./dynamic-devices-indicators.type";
import { CpuDynamicIndicatorsType, GpuDynamicIndicatorsType } from "@/entities/devices";
import _ from "lodash";

type DevicesStreamStore = {
  cpuDynamicTotalIndicators: Map<string, CpuDynamicIndicatorsType>
  gpuDynamicTotalIndicators: Map<string, GpuDynamicIndicatorsType>
}

type Actions = {
  setDevicesIndicators: (devicesIndicators: DevicesIndicatorsType) => void
}

export const devicesStreamStore = create<DevicesStreamStore & Actions>((set) => ({
  cpuDynamicTotalIndicators: new Map<string, CpuDynamicIndicatorsType>(),
  gpuDynamicTotalIndicators: new Map<string, GpuDynamicIndicatorsType>(),
  setDevicesIndicators: (devicesIndicators: DevicesIndicatorsType) => {
    const gpuDevicesIndicatorsMap = new Map();
    const cpuDevicesIndicatorsMap = new Map();

    _.forEach(devicesIndicators.gpuDynamicTotalIndicators, (value) => {
      gpuDevicesIndicatorsMap.set(value.deviceId, value);
    });

    _.forEach(devicesIndicators.cpuDynamicTotalIndicators, (value) => {
      cpuDevicesIndicatorsMap.set(value.deviceId, value);
    });

    set({ 
      cpuDynamicTotalIndicators: cpuDevicesIndicatorsMap,
      gpuDynamicTotalIndicators: gpuDevicesIndicatorsMap
    });
  }
}))