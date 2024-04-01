import { z } from "zod";

export const RigInternetInfo = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  model: z.string({invalid_type_error: 'Model must be a string'}),
  brand: z.string({invalid_type_error: 'Brand must be a string'}),
  busInfo: z.string({invalid_type_error: 'BusInfo must be a string'}),
  vendorCode: z.string({invalid_type_error: 'VendorCode must be a string'}),
  logicalName: z.string({invalid_type_error: 'LogicalName must be a string'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}),
  ip: z.string({invalid_type_error: 'Ip must be a string'}),
  isOnline: z.boolean()
})
export type RigInternetInfo = z.infer<typeof RigInternetInfo>