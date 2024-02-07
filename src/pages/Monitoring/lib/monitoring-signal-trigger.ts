import { Shares, StatisticCoin, TotalCpus, TotalGpus } from "@/entities/statistic/model/types";
import { ChartDataValue } from "@/shared/lib/charts/line-chart";
import { WebsocketContext } from "@/shared/lib/providers/websocket-context";
import { MeasureUnit } from "@/shared/types/measure-unit";
import { useState } from "react";

export function useMonitoringSignalTrigger() {
  const [maxLenght, setMaxLenght] = useState<number>(150);
  const [chartDataValue, setChartDataValue] = useState<ChartDataValue[]>([])
  const [totalPower, setTotalPower] = useState<MeasureUnit>()
  const [totalWorkers, setTotalWorkers] = useState<number>()
  const [statisticCoins, setStatisticCoins] = useState<StatisticCoin[]>([])
  const [totalShares, setTotalShares] = useState<Shares>()
  const [totalGpus, setTotalGpus] = useState<TotalGpus>()
  const [totalCpus, setTotalCpus] = useState<TotalCpus>()

  WebsocketContext.useSignalREffect(
    'ReceivedHashRateForAPeriod',
    (data: ChartDataValue[]) => {
      setMaxLenght(data.length)
      setChartDataValue(data)
    },
    []
  )
  
  WebsocketContext.useSignalREffect(
    'ReceivedCurrentHashRate',
    (data: ChartDataValue) => {
      if (chartDataValue.length > maxLenght) setChartDataValue(chartDataValue.splice(0, 1))
      setChartDataValue(chartDataValue.concat(data))
    },
    []
  )

  WebsocketContext.useSignalREffect(
    'ReceivedTotalPower',
    (data: MeasureUnit) => setTotalPower(data),
    []
  )

  WebsocketContext.useSignalREffect(
    'ReceivedTotalWorkers',
    (data: number) => setTotalWorkers(data),
    []
  )

  WebsocketContext.useSignalREffect(
    'ReceivedStatisticCoins',
    (data: StatisticCoin[]) => setStatisticCoins(data),
    []
  )

  WebsocketContext.useSignalREffect(
    'ReceivedTotalShares',
    (data: Shares) => setTotalShares(data),
    []
  )
  
  WebsocketContext.useSignalREffect(
    'ReceivedTotalGpus',
    (data: TotalGpus) => setTotalGpus(data),
    []
  )

  WebsocketContext.useSignalREffect(
    'ReceivedTotalCpus',
    (data: TotalCpus) => setTotalCpus(data),
    []
  )

  return {
    chartDataValue,
    totalPower,
    totalWorkers,
    totalShares,
    totalGpus,
    statisticCoins,
    totalCpus
  }
}