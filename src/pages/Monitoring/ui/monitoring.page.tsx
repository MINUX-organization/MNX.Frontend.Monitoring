import { 
  MemoizedStatisticCoinChart, 
  MemoizedStatisticCoinTable, 
  MemoizedTotalCpusWidget, 
  MemoizedTotalGpusWidget, 
  MemoizedTotalPower, 
  MemoizedTotalShares, 
  MemoizedTotalWorkers } from "@/entities/statistic";
import styles from './monitoring.page.module.scss'
import { WebsocketContext, WebsocketContextProvider } from "@/shared/lib/providers/websocket-context";
import { ChartDataValue } from "@/shared/lib/charts/line-chart";
import { useState } from "react";
import { MeasureUnit } from "@/shared/types/measure-unit";
import { Shares, StatisticCoin, TotalCpus, TotalGpus } from "@/entities/statistic/model/types";
  
export function Monitoring() {
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

  return (
    <WebsocketContextProvider url="http://localhost:5090/hubs/monitoring">
      <div className={styles['wrapper']}>
        <article className={styles['slot-1']}>
          <MemoizedTotalPower className={styles['item-1']} value={totalPower}/>
          <MemoizedTotalWorkers className={styles['item-2']} value={totalWorkers}/>
          <MemoizedStatisticCoinTable className={styles['item-3']} values={statisticCoins}/>
        </article>
        <article className={styles['slot-2']}>
          <MemoizedTotalShares className={styles['item-1']} value={totalShares}/>
          <MemoizedTotalGpusWidget className={styles['item-2']} value={totalGpus}/>
          <MemoizedTotalCpusWidget className={styles['item-3']} value={totalCpus}/>
          <MemoizedStatisticCoinChart className={styles['item-4']} values={chartDataValue}/> 
        </article>
        <article className={styles['slot-3']}>
        </article>
      </div>
    </WebsocketContextProvider>
  )
}