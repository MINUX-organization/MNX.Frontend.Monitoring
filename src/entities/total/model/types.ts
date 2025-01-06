import { z } from "zod";

export const SharesCount = z.object({
  accepted: z.number({ invalid_type_error: 'Accepted must be a number'}),
  rejected: z.number({ invalid_type_error: 'Rejected must be a number'}) 
}) 
export type SharesCount = z.infer<typeof SharesCount>

export const CoinStatistic = z.object({
  coinName: z.string({invalid_type_error: 'Coin must be a string'}),
  hashRate: z.number({invalid_type_error: 'Hashrate must be a number'}),
  shares: SharesCount
})
export type CoinStatistic = z.infer<typeof CoinStatistic>

export const TotalPower = z.number({invalid_type_error: 'TotalPower must be a number'})
export type TotalPower = z.infer<typeof TotalPower>

export const TotalRigsCount = z.number({invalid_type_error: 'TotalRigsCount must be a number'})
export type TotalRigsCount = z.infer<typeof TotalRigsCount>

export type FieldWidget = {
  label: string;
  value?: number;
  style?: string;
}