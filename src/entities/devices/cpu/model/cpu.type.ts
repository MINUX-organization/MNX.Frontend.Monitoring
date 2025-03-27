import { z } from "zod";
import { PciSchema } from "../../model/pci.type";
import { CpuInformationSchema } from "./cpu-information.type";

export const CpuSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  pci: PciSchema,
  information: CpuInformationSchema,
  rigName: z.string({invalid_type_error: 'Rig name must be a string'}),
  flightSheetName: z.string({invalid_type_error: 'Flight sheet name must be a string'}).optional(),
  minerName: z.string({invalid_type_error: 'Miner name must be a string'}).optional(),
})
export type CpuType = z.infer<typeof CpuSchema>