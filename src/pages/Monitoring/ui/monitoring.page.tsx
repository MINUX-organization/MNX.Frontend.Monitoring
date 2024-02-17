import {
  MemoizedTotalCoinsList, 
  MemoizedTotalCpusCount, 
  MemoizedTotalGpusCount, 
  MemoizedTotalPower, 
  MemoizedTotalShares, 
  MemoizedTotalWorkersCount } from "@/entities/total";
import styles from './monitoring.page.module.scss'
import { WebsocketContextProvider } from "@/shared/lib/providers/websocket-context";
import { useTotalDataSignalTrigger } from "../lib/hooks/total-data-signal-trigger";
import { MemoizedChangeChartCoinsList } from "@/features/chart/change-coin-chart";
import { MemoizedWorkerItem, MemoizedWorkersList } from "@/entities/worker";
import { MemoizedCoinChart } from "@/entities/chart";
import { PowerOffButton } from "@/features/worker/power-off";
import { StopMiningButton } from "@/features/worker/stop-mining";
import { RebootButton } from "@/features/worker/reboot";
import { RebootInButton } from "@/features/worker/reboot-in";
import { useChartDataSignalTrigger } from "../lib/hooks/chart-data-signal-trigger";
import { useWorkersDataSignalTrigger } from "../lib/hooks/workers-data-signal-trigger";
import { BACKEND_APIS } from "@/shared/constants/backend-urls";

export function Monitoring() {
  const {
    totalPower: {value: totalPower},
    totalWorkersCount: {value: totalWorkersCount},
    totalShares: {value: totalShares},
    totalCpusCount: {value: totalCpusCount},
    totalGpusCount: {value: totalGpusCount},
    totalCoinsList: {value: totalCoinsList},
    chartCoinsList: {value: chartCoinsList}
  } = useTotalDataSignalTrigger();
  const { value: chartDataList } = useChartDataSignalTrigger();
  const { value: workersList } = useWorkersDataSignalTrigger();
  return (
    <WebsocketContextProvider url={BACKEND_APIS.HUB_MONITORING}>
      <div className={styles['wrapper']}>
        <article className={styles['slot-1']}>
          <MemoizedTotalPower className={styles['item-1']} value={totalPower}/>
          <MemoizedTotalWorkersCount className={styles['item-2']} value={totalWorkersCount}/>
          <MemoizedTotalCoinsList className={styles['item-3']} values={totalCoinsList}/>
        </article>
        <article className={styles['slot-2']}>
          <MemoizedTotalShares className={styles['item-1']} value={totalShares}/>
          <MemoizedTotalGpusCount className={styles['item-2']} value={totalGpusCount}/>
          <MemoizedTotalCpusCount className={styles['item-3']} value={totalCpusCount}/>
          <MemoizedCoinChart 
            className={styles['item-4']} 
            values={chartDataList}
            renderCoinList={() => <MemoizedChangeChartCoinsList coinsList={chartCoinsList}/>}/> 
        </article>
        <article className={styles['slot-3']}>
          <MemoizedWorkersList 
            workersList={workersList}
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