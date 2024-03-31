import { z } from "zod";

export const RigHddInfo = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}),
  capacity: z.string({invalid_type_error: 'Capacity must be a string'}),
})