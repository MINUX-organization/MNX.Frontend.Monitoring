import { CpuDynamicIndicatorsSchema, GpuDynamicIndicatorsSchema } from "@/entities/devices";
import { z } from "zod";

export const DevicesIndicatorsSchema = z.object({
  cpuDynamicTotalIndicators: CpuDynamicIndicatorsSchema.array(),
  gpuDynamicTotalIndicators: GpuDynamicIndicatorsSchema.array(),
})
export type DevicesIndicatorsType = z.infer<typeof DevicesIndicatorsSchema>