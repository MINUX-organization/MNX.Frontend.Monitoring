import { 
  MemoizedStatisticCoinChart, 
  MemoizedStatisticCoinTable, 
  MemoizedTotalCpusWidget, 
  MemoizedTotalGpusWidget, 
  MemoizedTotalPower, 
  MemoizedTotalShares, 
  MemoizedTotalWorkers } from "@/entities/statistic";
import styles from './monitoring.page.module.scss'
import { WebsocketContextProvider } from "@/shared/lib/providers/websocket-context";
import { useMonitoringSignalTrigger } from "../lib/monitoring-signal-trigger";
  
export function Monitoring() {
  const {
    totalPower,
    totalWorkers,
    totalShares,
    totalCpus,
    totalGpus,
    chartDataValues,
    statisticCoins
  } = useMonitoringSignalTrigger();
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
          <MemoizedStatisticCoinChart className={styles['item-4']} values={chartDataValues}/> 
        </article>
        <article className={styles['slot-3']}>
        </article>
      </div>
    </WebsocketContextProvider>
  )
}