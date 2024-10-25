import { z } from "zod";

export const HddInfo = z.object({
  manufacturer: z.string({invalid_type_error: 'Manufacturer must be a string'}),
  model: z.string({invalid_type_error: 'Model must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}),
  capacity: z.number({invalid_type_error: 'Capacity must be a number'}),
}, {invalid_type_error: 'Information must be an object'})
export type HddInfo = z.infer<typeof HddInfo>

export const RigHddInfo = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  information: HddInfo,
})
export type RigHddInfo = z.infer<typeof RigHddInfo>