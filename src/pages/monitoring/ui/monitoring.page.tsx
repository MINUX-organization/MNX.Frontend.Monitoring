import {
  MemoizedTotalCoinsList,
  MemoizedTotalCpusCount,
  MemoizedTotalGpusCount,
  MemoizedTotalPower,
  MemoizedTotalShares,
  MemoizedTotalRigsCount } from "@/entities/total";
import styles from './monitoring.page.module.scss';
import { MemoizedRigItem, MemoizedRigsListTable } from "@/entities/rig";
import { PowerOffButton } from "@/features/rig/power-off";
import { StartStopMiningButton } from "@/features/rig/start-stop-mining";
import { RebootButton } from "@/features/rig/reboot";
import { RebootInButton } from "@/features/rig/reboot-in";
import { useMonitoringStream } from "../hooks/monitoring-stream";

export function MonitoringPage() {
  const indicators = useMonitoringStream();
  
  return (
      <div className={styles['monitoring-page']}>
        <article className={styles['slot-1']}>
          <MemoizedTotalPower className={styles['item-1']} value={indicators?.totalPower}/>
          <MemoizedTotalRigsCount className={styles['item-2']} value={indicators?.miningRigsIndicators.length}/>
          <MemoizedTotalCoinsList className={styles['item-3']} values={indicators?.totalCoinStatistics}/>
        </article>
        <article className={styles['slot-2']}>
          <MemoizedTotalShares className={styles['item-1']} value={indicators?.totalShares}/>
          <MemoizedTotalGpusCount className={styles['item-2']} value={indicators?.totalDevices}/>
          <MemoizedTotalCpusCount className={styles['item-3']} value={indicators?.totalDevices}/>
          {/* <MemoizedCoinChart
            className={styles['item-4']} 
            values={chartDataList}
            renderCoinList={() => <MemoizedChangeChartCoinsList coinsList={chartCoinsList}/>}
          />  */}
        </article>
        <article className={styles['slot-3']}>
            <MemoizedRigsListTable 
              rigsList={indicators?.miningRigsIndicators}
              renderRigItem={(rig) => (
                <MemoizedRigItem
                  key={rig?.id}
                  rig={rig}
                  renderRigStartStopMining={() => 
                    <StartStopMiningButton 
                      rigIsActive={true} 
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
  )
}