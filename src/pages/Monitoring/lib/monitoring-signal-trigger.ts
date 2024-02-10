import { Shares, StatisticCoin, TotalCpus, TotalGpus, TotalPower, TotalWorkers } from "@/entities/statistic/model/types";
import { ChartDataValue } from "@/shared/lib/charts/line-chart";
import { WebsocketContext } from "@/shared/lib/providers/websocket-context"; 
import { match } from 'ts-pattern';
import { useState } from "react";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";

type Type = 
  "ChartDataValues" |
  "ChartDataValue"  |
  "StatisticCoins"  |
  "TotalShares"     |
  "TotalPower"      |
  "TotalWorkers"    |
  "TotalGpus"       |
  "TotalCpus"
  
type TriggerData = {
  type: Type;
  newData: unknown;
}

export function useMonitoringSignalTrigger() {
  const [maxLenght, setMaxLenght] = useState<number>(150);
  const [chartDataValues, setChartDataValues] = useState<ChartDataValue[]>([])
  const [totalPower, setTotalPower] = useState<TotalPower>()
  const [totalWorkers, setTotalWorkers] = useState<TotalWorkers>()
  const [statisticCoins, setStatisticCoins] = useState<StatisticCoin[]>([])
  const [totalShares, setTotalShares] = useState<Shares>()
  const [totalGpus, setTotalGpus] = useState<TotalGpus>()
  const [totalCpus, setTotalCpus] = useState<TotalCpus>()

  WebsocketContext.useSignalREffect(
    'ReceivedMonitoringData',
    (data: TriggerData) => {
      match(data)
        .with({ type: "ChartDataValues" }, ({ newData }) => {
          ZodSaveParse(newData, ChartDataValue.array(), (checkedData) => {
            setMaxLenght(checkedData.length)
            setChartDataValues(checkedData);
          });
        })
        .with({ type: "ChartDataValue" }, ({ newData }) => {
          ZodSaveParse(newData, ChartDataValue, (checkedData) => {
            if (chartDataValues.length >= maxLenght)
              setChartDataValues(chartDataValues.splice(0, 1))
            setChartDataValues(chartDataValues.concat(checkedData))
          });
        })
        .with({ type: "TotalPower" }, ({ newData }) => 
          ZodSaveParse(newData, TotalPower, (checkedData) => setTotalPower(checkedData)))
        .with({ type: "TotalGpus" }, ({ newData }) => 
          ZodSaveParse(newData, TotalGpus, (checkedData) => setTotalGpus(checkedData)))
        .with({ type: "TotalCpus" }, ({ newData }) => 
          ZodSaveParse(newData, TotalCpus, (checkedData) => setTotalCpus(checkedData)))
        .with({ type: 'StatisticCoins'}, ({ newData }) => 
          ZodSaveParse(newData, StatisticCoin.array(), (checkedData) => setStatisticCoins(checkedData)))
        .with({ type: "TotalShares" }, ({ newData }) => 
          ZodSaveParse(newData, Shares, (checkedData) => setTotalShares(checkedData)))
        .with({ type: "TotalWorkers" }, ({ newData }) => 
          ZodSaveParse(newData, TotalWorkers, (checkedData) => setTotalWorkers(checkedData)))
    }, 
    []
  )

  return {
    chartDataValues,
    totalPower,
    totalWorkers,
    totalShares,
    totalGpus,
    statisticCoins,
    totalCpus
  }
}