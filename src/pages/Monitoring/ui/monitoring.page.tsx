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
import { MemoizedWorkerItem, MemoizedWorkerList } from "@/entities/worker";
import { MemoizedStatisticCoinChart } from "@/entities/chart";
import { PowerOffButton } from "@/features/worker/power-off";
import { StopMiningButton } from "@/features/worker/stop-mining";
import { RebootButton } from "@/features/worker/reboot";
import { RebootInButton } from "@/features/worker/reboot-in";
import { Worker as Type } from "@/entities/worker";
  
const testWorker: Type = {
  id: 1,
  name: "Sample Worker",
  gpusState: [
    'active', 'inactive', 'error', 
    'empty', 'active', 'inactive', 
    'error', 'empty', 'empty', 
    'empty', 'empty', 'empty', 
    'empty', 'empty',
  ],
  isActive: true,
  onlineState: '1',
  onlineSpeed: { value: 100, measureUnit: 'Mh/s' },
  averageTemperature: 50,
  fanSpeed: 70,
  power: { value: 750, measureUnit: 'W' },
  flightSheetInfo: [
    {
      coin: "Ethereum",
      flightSheet: "Sample Flight Sheet",
      miner: "Sample Miner",
      hashrate: { value: 100, measureUnit: 'Mh/s' },
      shares: { accepted: 100, rejected: 5 }
    },
    {
      coin: "Bitcoin",
      flightSheet: "Text Flight Sheet",
      miner: "Sample Miner",
      hashrate: { value: 100, measureUnit: 'Mh/s' },
      shares: { accepted: 100, rejected: 5 }
    },
    {
      coin: "Monero",
      flightSheet: "Mega Flight Sheet",
      miner: "Sample Miner",
      hashrate: { value: 100, measureUnit: 'Mh/s' },
      shares: { accepted: 100, rejected: 5 }
    }
  ],
  miningUpTime: "10 hours",
  bootedUpTime: "1 day",
  localIp: "192.168.1.100",
  minuxVersion: "v2.1.0",
  nvidiaCount: 3,
  amdCount: 2,
  intelCount: 1
};

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
          <MemoizedWorkerList 
            workers={[testWorker]}
            renderWorkerItem={(worker) => (
              <MemoizedWorkerItem
                key={worker?.id}
                worker={worker}
                workerStopMiningRender={() => <StopMiningButton workerId={worker?.id}/>}
                workerPowerOffRender={() => <PowerOffButton workerId={worker?.id}/>}
                workerRebootRender={() => <RebootButton workerId={worker?.id}/>}
                workerRebootInRender={() => <RebootInButton workerId={worker?.id}/>}
              />
            )}
          />
        </article>
      </div>
    </WebsocketContextProvider>
  )
}