import { MeasureUnit } from "@/shared/types/measure-unit";
import { z } from "zod";

export const Shares = z.object({
  accepted: z.number({ invalid_type_error: 'Accepted must be a number'}),
  rejected: z.number({ invalid_type_error: 'Rejected must be a number'}) 
}) 
export type Shares = z.infer<typeof Shares>

export const StatisticCoin = z.object({
  coin: z.string({invalid_type_error: 'Coin must be a string'}),
  algorithm: z.string({invalid_type_error: 'Algorithm must be a string'}),
  hashrate: MeasureUnit,
  shares: Shares
})
export type StatisticCoin = z.infer<typeof StatisticCoin>

export const TotalGpus = z.object({
  total: z.number({invalid_type_error: 'Total must be a number'}),
  nvidia: z.number({invalid_type_error: 'Nvidia must be a number'}),
  amd: z.number({invalid_type_error: 'Amd must be a number'}),
  intel: z.number({invalid_type_error: 'Intel must be a number'})
})
export type TotalGpus = z.infer<typeof TotalGpus>

export const TotalPower = MeasureUnit
export type TotalPower = z.infer<typeof TotalPower>

export const TotalWorkers = z.number({invalid_type_error: 'TotalWorkers must be a number'})
export type TotalWorkers = z.infer<typeof TotalWorkers>

export const TotalCpus = z.object({
  total: z.number({invalid_type_error: 'Total must be a number'}),
  amd: z.number({invalid_type_error: 'Amd must be a number'}),
  intel: z.number({invalid_type_error: 'Intel must be a number'})
})
export type TotalCpus = z.infer<typeof TotalCpus>

export type FieldWidget = {
  label: string;
  value?: number;
  style?: string;
}