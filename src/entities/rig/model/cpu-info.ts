import { Restrictions } from "@/shared/types/restrictions";
import { z } from "zod";

export const CpuPci = z.object({
  id: z.number({invalid_type_error: 'Id must be a number'}),
  bus: z.string({invalid_type_error: 'Bus must be a string'}),
})
export type CpuPci = z.infer<typeof CpuPci>

export const CpuInfo = z.object({
  manufacturer: z.string({invalid_type_error: 'Manufacturer must be a string'}),
  model: z.string({invalid_type_error: 'Model must be a string'}),
  name: z.string({invalid_type_error: 'Name must be a string'}),
  coresCount: z.number({invalid_type_error: 'CoresCount must be a number'}),
  threadsCount: z.number({invalid_type_error: 'ThreadsCount must be a number'}),
  architecture: z.string({invalid_type_error: 'Architecture must be a string'}),
  cache: z.object({
    l1: z.number({invalid_type_error: 'L1 must be a number'}).nullable(),
    l2: z.number({invalid_type_error: 'L2 must be a number'}).nullable(),
    l3: z.number({invalid_type_error: 'L3 must be a number'}).nullable(),
    l4: z.number({invalid_type_error: 'L4 must be a number'}).nullable(),
  }, {invalid_type_error: 'Cache must be an object'}),
}, {invalid_type_error: 'Information must be an object'})

export const CpuRestrictions = z.object({
  power: Restrictions,
  fanSpeed: Restrictions,
  temperature: Restrictions,
  clock: Restrictions,
}, {invalid_type_error: 'Restrictions must be an object'})

export const RigCpuInfo = z.object({
  id: z.string({invalid_type_error: 'Id must be a string'}),
  pci: CpuPci,
  rigName: z.string({invalid_type_error: 'RigName must be a string'}),
  information: CpuInfo,
  restrictions: CpuRestrictions
}, {invalid_type_error: 'CpuInfo must be an object'})
export type RigCpuInfo = z.infer<typeof RigCpuInfo>