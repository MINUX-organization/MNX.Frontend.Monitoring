import { z } from "zod";

export const RigMotherboardInfo = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}),
  sataPortsCount: z.number({invalid_type_error: 'SataPortsCount must be a number'}),
  ramPortsCount: z.number({invalid_type_error: 'RamPortsCount must be a number'}),
  pcix4Count: z.number({invalid_type_error: 'Pcix4Count must be a number'}),
  pcix16Count: z.number({invalid_type_error: 'Pcix16Count must be a number'}),
  ramState: z.array(z.boolean()),
  sataState: z.array(z.enum(['Active', 'Inactive', 'Error', 'Empty']))
})
export type RigMotherboardInfo = z.infer<typeof RigMotherboardInfo>