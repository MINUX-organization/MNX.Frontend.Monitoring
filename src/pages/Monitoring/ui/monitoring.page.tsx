import {
  MemoizedTotalCoinsList, 
  MemoizedTotalCpusCount, 
  MemoizedTotalGpusCount, 
  MemoizedTotalPower, 
  MemoizedTotalShares, 
  MemoizedTotalRigsCount } from "@/entities/total";
import styles from './monitoring.page.module.scss'
import { WebsocketContextProvider } from "@/shared/lib/providers/websocket-provider";
import { useTotalDataSignalTrigger } from "../lib/hooks/total-data-signal-trigger";
import { MemoizedChangeChartCoinsList } from "@/features/chart/change-coin-chart";
import { MemoizedRigItem, MemoizedRigsList } from "@/entities/rig";
import { MemoizedCoinChart } from "@/entities/chart";
import { PowerOffButton } from "@/features/rig/power-off";
import { StartStopMiningButton } from "@/features/rig/start-stop-mining";
import { RebootButton } from "@/features/rig/reboot";
import { RebootInButton } from "@/features/rig/reboot-in";
import { useChartDataSignalTrigger } from "../lib/hooks/chart-data-signal-trigger";
import { useRigsDataSignalTrigger } from "../lib/hooks/rigs-data-signal-trigger";
import { BACKEND_HUBS } from "@/shared/constants/backend-urls";

export function Monitoring() {
  const {
    totalPower: {value: totalPower},
    totalRigsCount: {value: totalRigsCount},
    totalShares: {value: totalShares},
    totalCpusCount: {value: totalCpusCount},
    totalGpusCount: {value: totalGpusCount},
    totalCoinsList: {value: totalCoinsList},
    chartCoinsList: {value: chartCoinsList}
  } = useTotalDataSignalTrigger();
  
  const { value: chartDataList } = useChartDataSignalTrigger();

  const { value: rigsList } = useRigsDataSignalTrigger();
  
  return (
    <WebsocketContextProvider url={BACKEND_HUBS.MONITORING}>
      <div className={styles['monitoring-page']}>
        <article className={styles['slot-1']}>
          <MemoizedTotalPower className={styles['item-1']} value={totalPower}/>
          <MemoizedTotalRigsCount className={styles['item-2']} value={totalRigsCount}/>
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
            <MemoizedRigsList 
              rigsList={rigsList}
              renderRigItem={(rig) => (
                <MemoizedRigItem
                  key={rig?.id}
                  rig={rig}
                  renderRigStartStopMining={() => 
                    <StartStopMiningButton 
                      rigIsActive={rig?.isActive} 
                      rigIsOnline={rig?.onlineState !== "0"}
                      rigId={rig?.id}
                    />}
                  renderRigPowerOff={() => 
                    <PowerOffButton rigIsOnline={rig?.onlineState !== "0"} rigId={rig?.id}/>}
                  renderRigReboot={() => 
                    <RebootButton rigIsOnline={rig?.onlineState !== "0"} rigId={rig?.id}/>}
                  renderRigRebootIn={() => 
                    <RebootInButton rigIsOnline={rig?.onlineState !== "0"} rigId={rig?.id}/>}
                />
              )}
            />
        </article>
      </div>
    </WebsocketContextProvider>
  )
}