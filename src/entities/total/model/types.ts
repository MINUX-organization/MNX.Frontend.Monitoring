import { MeasureUnit } from "@/shared/types/measure-unit";
import { z } from "zod";

export const SharesCount = z.object({
  accepted: z.number({ invalid_type_error: 'Accepted must be a number'}),
  rejected: z.number({ invalid_type_error: 'Rejected must be a number'}) 
}) 
export type SharesCount = z.infer<typeof SharesCount>

export const TotalCoinValue = z.object({
  coin: z.string({invalid_type_error: 'Coin must be a string'}),
  algorithm: z.string({invalid_type_error: 'Algorithm must be a string'}),
  hashrate: MeasureUnit,
  shares: SharesCount
})
export type TotalCoinValue = z.infer<typeof TotalCoinValue>

export const TotalGpusCount = z.object({
  total: z.number({invalid_type_error: 'Total must be a number'}),
  nvidia: z.number({invalid_type_error: 'Nvidia must be a number'}),
  amd: z.number({invalid_type_error: 'Amd must be a number'}),
  intel: z.number({invalid_type_error: 'Intel must be a number'})
})
export type TotalGpusCount = z.infer<typeof TotalGpusCount>

export const TotalPower = MeasureUnit
export type TotalPower = z.infer<typeof TotalPower>

export const TotalRigsCount = z.number({invalid_type_error: 'TotalRigsCount must be a number'})
export type TotalRigsCount = z.infer<typeof TotalRigsCount>

export const TotalCpusCount = z.object({
  total: z.number({invalid_type_error: 'Total must be a number'}),
  amd: z.number({invalid_type_error: 'Amd must be a number'}),
  intel: z.number({invalid_type_error: 'Intel must be a number'})
})
export type TotalCpusCount = z.infer<typeof TotalCpusCount>

export type FieldWidget = {
  label: string;
  value?: number;
  style?: string;
}