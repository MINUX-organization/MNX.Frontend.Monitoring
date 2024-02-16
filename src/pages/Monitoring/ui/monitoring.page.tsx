import {
  MemoizedStatisticCoinTable, 
  MemoizedTotalCpusWidget, 
  MemoizedTotalGpusWidget, 
  MemoizedTotalPower, 
  MemoizedTotalShares, 
  MemoizedTotalWorkers } from "@/entities/total";
import styles from './monitoring.page.module.scss'
import { WebsocketContextProvider } from "@/shared/lib/providers/websocket-context";
import { useMonitoringSignalTrigger } from "../lib/monitoring-signal-trigger";
import { MemoizedChangeCoinChartList } from "@/features/chart/change-coin-chart";
import { MemoizedWorkerList } from "@/entities/worker";
import { MemoizedStatisticCoinChart } from "@/entities/chart";
  
export function Monitoring() {
  const {
    totalPower: {value: totalPower},
    totalWorkers: {value: totalWorkers},
    totalShares: {value: totalShares},
    totalCpus: {value: totalCpus},
    totalGpus: {value: totalGpus},
    chartDataList: {value: chartDataList},
    statisticCoinList: {value: statisticCoinList},
    coinsChart: {value: coinsChart}
  } = useMonitoringSignalTrigger();
  return (
    <WebsocketContextProvider url="http://localhost:5090/hubs/monitoring">
      <div className={styles['wrapper']}>
        <article className={styles['slot-1']}>
          <MemoizedTotalPower className={styles['item-1']} value={totalPower}/>
          <MemoizedTotalWorkers className={styles['item-2']} value={totalWorkers}/>
          <MemoizedStatisticCoinTable className={styles['item-3']} values={statisticCoinList}/>
        </article>
        <article className={styles['slot-2']}>
          <MemoizedTotalShares className={styles['item-1']} value={totalShares}/>
          <MemoizedTotalGpusWidget className={styles['item-2']} value={totalGpus}/>
          <MemoizedTotalCpusWidget className={styles['item-3']} value={totalCpus}/>
          <MemoizedStatisticCoinChart 
            className={styles['item-4']} 
            values={chartDataList}
            renderCoinList={() => <MemoizedChangeCoinChartList coins={coinsChart}/>}/> 
        </article>
        <article className={styles['slot-3']}>
          <MemoizedWorkerList/>
        </article>
      </div>
    </WebsocketContextProvider>
  )
}