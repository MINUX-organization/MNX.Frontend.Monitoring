import { z } from "zod";

export const GpuInformationSchema = z.object({
  $type: z.string({invalid_type_error: 'Type must be a string'}).optional(),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  manufacturer: z.string({invalid_type_error: 'Manufacturer must be a string'}),
  model: z.string({invalid_type_error: 'Model must be a string'}),
  serialNumber: z.string({invalid_type_error: 'Serial number must be a string'}).optional(),
  vendor: z.string({invalid_type_error: 'Vendor must be a string'}),
  biosVersion: z.string({invalid_type_error: 'Bios version must be a string'}).optional(),
  technology: z.object({
    type: z.string({invalid_type_error: 'Type must be a string'}),
    version: z.string({invalid_type_error: 'Version must be a string'})
  }),
  memory: z.object({
    total: z.number({invalid_type_error: 'Total must be a number'}),
    type: z.string({invalid_type_error: 'Type must be a string'}).optional(),
    vendor: z.string({invalid_type_error: 'Vendor must be a string'}).optional(),
  })
})

export type GpuInformationType = z.infer<typeof GpuInformationSchema>