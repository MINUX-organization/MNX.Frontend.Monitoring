import { z } from "zod";

export const CountDevicesSchema = z.object({
  totalCpusCountGroupedByManufacturer: z.record(z.number({invalid_type_error: 'Total cpus count must be a number'})),
  totalGpusCountGroupedByManufacturer: z.record(z.number({invalid_type_error: 'Total gpus count must be a number'})),
  totalCpusCount: z.number({invalid_type_error: 'Total cpus count must be a number'}),
  totalGpusCount: z.number({invalid_type_error: 'Total gpus count must be a number'}),
  totalDrivesCount: z.number({invalid_type_error: 'Total drives count must be a number'}),
})
export type CountDevicesType = z.infer<typeof CountDevicesSchema>