import { z } from "zod";
import { PresetSchema } from "./preset.type";

export const PresetGroupByGpuSchema = z.object({
  gpu: z.string({invalid_type_error: 'Gpu must be a string'}),
  presets: PresetSchema.array(),
})
export type PresetGroupByGpuType = z.infer<typeof PresetGroupByGpuSchema>