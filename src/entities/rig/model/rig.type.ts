import { z } from "zod";
import { SoftwareSchema } from "./software.type";
import { CountDevicesSchema } from "./count-devices.type";

export const RigSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  ownerId: z.string({invalid_type_error: 'Owner id must be a string'}),
  mac: z.string({invalid_type_error: 'Mac must be a string'}),
  globalIP: z.string({invalid_type_error: 'Global ip must be a string'}),
  localIP: z.string({invalid_type_error: 'Local ip must be a string'}),
  software: SoftwareSchema,
  countDevices: CountDevicesSchema,
})
export type RigType = z.infer<typeof RigSchema>