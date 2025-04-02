import { z } from "zod";

export const FlightSheetDevicesSchema = z.object({
  name: z.string({invalid_type_error: 'Name must be a string'}),
  elements: z.array(z.object({
    name: z.string({invalid_type_error: 'Name must be a string'}),
    elements: z.array(z.object({
      id: z.string({invalid_type_error: 'Id must be a string'}),
      manufacturer: z.string({invalid_type_error: 'Manufacturer must be a string'}),
      model: z.string({invalid_type_error: 'Model must be a string'}),
      rigName: z.string({invalid_type_error: 'Rig name must be a string'}),
      type: z.string({invalid_type_error: 'Type must be a string'}),
      flightSheetName: z.string({invalid_type_error: 'Flight sheet name must be a string'}).optional(),
      flightSheetIsConfirm: z.boolean({invalid_type_error: 'Flight sheet is confirm must be a boolean'}),
      minerName: z.string({invalid_type_error: 'Miner name must be a string'}).optional(),
      pciBus: z.string({invalid_type_error: 'PCI bus must be a string'}),
      presetName: z.string({invalid_type_error: 'Preset name must be a string'}).optional()
    }))
  })) 
})
export type FlightSheetDevicesType = z.infer<typeof FlightSheetDevicesSchema>