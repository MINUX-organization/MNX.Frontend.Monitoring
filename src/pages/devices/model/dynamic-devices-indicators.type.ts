import { CpuDynamicIndicatorsSchema, GpuDynamicIndicatorsSchema } from "@/entities/devices";
import { z } from "zod";

export const DevicesIndicators = z.object({
  cpuDynamicTotalIndicators: CpuDynamicIndicatorsSchema.array(),
  gpuDynamicTotalIndicators: GpuDynamicIndicatorsSchema.array(),
})
export type DevicesIndicators = z.infer<typeof DevicesIndicators>