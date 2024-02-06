import { MeasureUnit } from "@/shared/types/measure-unit";
import { z } from "zod";

export const Shares = z.object({
  accepted: z.number(),
  rejected: z.number() 
}) 
export type Shares = z.infer<typeof Shares>

export const StatisticCoin = z.object({
  coin: z.string(),
  algorithm: z.string(),
  hashrate: MeasureUnit,
  shares: Shares
})
export type StatisticCoin = z.infer<typeof StatisticCoin>

export const TotalGpus = z.object({
  total: z.number(),
  nvidia: z.number(),
  amd: z.number(),
  intel: z.number()
})
export type TotalGpus = z.infer<typeof TotalGpus>

export const TotalCpus = z.object({
  total: z.number(),
  amd: z.number(),
  intel: z.number()
})
export type TotalCpus = z.infer<typeof TotalCpus>

export type FieldWidget = {
  label: string;
  value?: number;
  style?: string;
}