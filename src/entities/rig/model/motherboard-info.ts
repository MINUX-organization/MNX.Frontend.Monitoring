import { z } from "zod";

export const MotherboardInfo = z.object({
  manufacturer: z.string({invalid_type_error: 'Manufacturer must be a string'}),
  model: z.string({invalid_type_error: 'Model must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  serialNumber: z.string({invalid_type_error: 'SerialNumber must be a string'}),
  sataPortsCount: z.number({invalid_type_error: 'SataPortsCount must be a number'}),
  ramPortsCount: z.number({invalid_type_error: 'RamPortsCount must be a number'}),
  pciX4PosrtsCount: z.number({invalid_type_error: 'PciX4PosrtsCount must be a number'}),
  pciX16PosrtsCount: z.number({invalid_type_error: 'PciX16PosrtsCount must be a number'}),
}, {invalid_type_error: 'Information must be an object'})

export const MotherboardPci = z.object({
  id: z.number({invalid_type_error: 'Id must be a number'}),
  bus: z.string({invalid_type_error: 'Bus must be a string'}),
  isInstalled: z.boolean({invalid_type_error: 'IsIntalled must be a boolean'}),
}, {invalid_type_error: 'Pci must be an object'})

export const RigMotherboardInfo = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  pcies: MotherboardPci.array(),
  information: MotherboardInfo,
})
export type RigMotherboardInfo = z.infer<typeof RigMotherboardInfo>