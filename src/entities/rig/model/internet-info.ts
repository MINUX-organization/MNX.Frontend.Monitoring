import { z } from "zod";

export const InternetInfo = z.object({
  manufacturer: z.string({invalid_type_error: 'Manufacturer must be a string'}),
  model: z.string({invalid_type_error: 'Model must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}),
  vendorCode: z.string({invalid_type_error: 'VendorCode must be a string'}),
  busInfo: z.string({invalid_type_error: 'BusInfo must be a string'}),
  logicalName: z.string({invalid_type_error: 'LogicalName must be a string'}),
  mac: z.string({invalid_type_error: 'Mac must be a string'}),
}, {invalid_type_error: 'Information must be an object'})

export const RigInternetInfo = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  globalIP: z.string({invalid_type_error: 'GlobalId must be a string'}),
  localIP: z.string({invalid_type_error: 'LocalIp must be a string'}),
  information: InternetInfo,
  isOnline: z.boolean({invalid_type_error: 'IsOnline must be a boolean'}),
})
export type RigInternetInfo = z.infer<typeof RigInternetInfo>