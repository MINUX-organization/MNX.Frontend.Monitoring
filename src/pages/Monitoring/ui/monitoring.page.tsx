import { 
  StatisticCoinChart, 
  StatisticCoinTable, 
  StatisticCpuWidget, 
  StatisticGpuWidget, 
  TotalPower, 
  TotalShares, 
  TotalWorkers } from "@/entities/statistic";
import styles from './monitoring.page.module.scss'
import { WebsocketContext, WebsocketContextProvider } from "@/shared/lib/providers/websocket-context";
import { ChartDataValue } from "@/shared/lib/charts/line-chart";
import { useState } from "react";
  
export function Monitoring() {
  const [chartDataValue, setChartDataValue] = useState<ChartDataValue>()

  WebsocketContext.useSignalREffect(
    'CurrentHashRateMessage',
    (data: ChartDataValue) => {
      console.log(data)
      setChartDataValue(data)
    },
    []
  )
  
  return (
    <WebsocketContextProvider url="http://localhost:5090/monitoringHub">
      <div className={styles['wrapper']} onClick={() => WebsocketContext.invoke('Send', 'a')}>
        <article className={styles['slot-1']}>
          <TotalPower className={styles['item-1']}/>
          <TotalWorkers className={styles['item-2']}/>
          <StatisticCoinTable className={styles['item-3']}/>
        </article>
        <article className={styles['slot-2']}>
          <TotalShares className={styles['item-1']}/>
          <StatisticGpuWidget className={styles['item-2']}/>
          <StatisticCpuWidget className={styles['item-3']}/>
          <div className={styles['item-4']}>
            <StatisticCoinChart /> 
          </div>
        </article>
        <article className={styles['slot-3']}>
        </article>
      </div>
    </WebsocketContextProvider>
  )
}