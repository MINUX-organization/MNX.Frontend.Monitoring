import { z } from "zod";

export const FanTypeSchema = z.enum(['TargetSpeed', 'TargetTemperature', 'LinearDependence'])
export type FanType = z.infer<typeof FanTypeSchema>

export const FanGraphicPoint = z.object({
  fanSpeedValueTarget: z.number({invalid_type_error: 'Speed must be a number'}),
  temperatureValueTarget: z.number({invalid_type_error: 'Temperature must be a number'})
})

export const FanOverclockingWithLinearDependenceSchema = z.object({
  $type: FanTypeSchema,
  targetPoints: z.array(FanGraphicPoint)
})
export type FanOverclockingWithLinearDependenceType = z.infer<typeof FanOverclockingWithLinearDependenceSchema>

export const FanOverclockingWithTargetSpeedSchema = z.object({
  $type: FanTypeSchema,
  targetSpeed: z.number({invalid_type_error: 'Target speed must be a number'})
})
export type FanOverclockingWithTargetSpeedType = z.infer<typeof FanOverclockingWithTargetSpeedSchema>

export const FanOverclockingWithTargetTemperatureSchema = z.object({
  $type: FanTypeSchema,
  minTargetSpeed: z.number({invalid_type_error: 'Min target speed must be a number'}),
  maxTargetSpeed: z.number({invalid_type_error: 'Max target speed must be a number'}),
  targetCoreTemperature: z.number({invalid_type_error: 'Target core temperature must be a number'}),
  targetMemoryTemperature: z.number({invalid_type_error: 'Target memory temperature must be a number'})
})
export type FanOverclockingWithTargetTemperatureType = z.infer<typeof FanOverclockingWithTargetTemperatureSchema>

export const FanOverclockingSchema = z.union([
  FanOverclockingWithLinearDependenceSchema, 
  FanOverclockingWithTargetSpeedSchema, 
  FanOverclockingWithTargetTemperatureSchema
])
export type FanOverclockingType = z.infer<typeof FanOverclockingSchema>