import { Rig } from "@/entities/rig";
import { SharesCount } from "@/entities/total";
import { CoinStatistic } from "@/entities/total/model/types";
import { z } from "zod";

export const TotalDevices = z.object({
  totalCpusCount: z.number({invalid_type_error: 'TotalCpusCount must be a number'}),
  totalGpusCount: z.number({invalid_type_error: 'TotalGpusCount must be a number'}),
  totalCpusCountGroupedByManufacturer: z.record(z.number({invalid_type_error: 'TotalCpusCount must be a number'})),
  totalGpusCountGroupedByManufacturer: z.record(z.number({invalid_type_error: 'TotalGpusCount must be a number'})),
})
export type TotalDevices = z.infer<typeof TotalDevices>

export const MonitoringIndicators = z.object({
  totalPower: z.number({invalid_type_error: 'TotalPower must be a number'}).optional(),
  totalHashrate: z.number({invalid_type_error: 'TotalTemperature must be a number'}).optional(),
  totalShares: SharesCount.optional(),
  totalDevices: TotalDevices.optional(),
  totalCoinStatistics: CoinStatistic.array().optional(),
  miningRigsIndicators: Rig.array(),
})
export type MonitoringIndicators = z.infer<typeof MonitoringIndicators>