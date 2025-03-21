import { z } from "zod";
import { GpuPciSchema } from "./gpu-pci.type";
import { GpuInformationSchema } from "./gpu-information.type";

export const GpuSchema = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  pci: GpuPciSchema,
  information: GpuInformationSchema,
  rigName: z.string({invalid_type_error: 'Rig name must be a string'}),
  driverVersion: z.string({invalid_type_error: 'Driver version must be a string'}),
  flightSheetName: z.string({invalid_type_error: 'Flight sheet name must be a string'}).optional(),
  minerName: z.string({invalid_type_error: 'Miner name must be a string'}).optional(),
});

export type GpuType = z.infer<typeof GpuSchema>