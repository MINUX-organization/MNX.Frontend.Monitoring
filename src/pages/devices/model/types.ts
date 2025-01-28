import { DeviceСpuDynamic } from "@/entities/devices/cpu";
import { DeviceGpuDynamic } from "@/entities/devices/gpu";
import { z } from "zod";

export const DevicesIndicators = z.object({
  cpuDynamicTotalIndicators: DeviceСpuDynamic.array(),
  gpuDynamicTotalIndicators: DeviceGpuDynamic.array(),
})
export type DevicesIndicators = z.infer<typeof DevicesIndicators>