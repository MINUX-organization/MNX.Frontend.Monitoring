import clsx from "clsx"
import styles from './styles/workerItem.module.scss'
import { Worker as Type, WorkerInfo } from "../model/types"
import { WorkerItemPanel } from "./worker-item-panel";
import { useStateObject } from "@/shared/lib/utils/state-object"; 
import { WorkerItemFlightSheetTable } from "./worker-item-flight-sheet-table";
import { WorkerItemDropdown } from "./worker-item-dropdown";
import { WorkerItemInfo } from "./worker-item-info";

export function WorkerItem({
  className,
  worker
} : {
  className?: string;
  worker?: Type;
}) {
  const isOpen = useStateObject<boolean>(false);
  const labels = [
    'Coin', 'Flight Sheet', 'Miner', 
    'Hashrate', 'Shares Accepted', 'Shares Rejected'
  ];
  const workerInfo: Partial<WorkerInfo> = {
    miningUpTime: worker?.miningUpTime,
    bootedUpTime: worker?.bootedUpTime,
    localIp: worker?.localIp,
    minuxVersion: worker?.minuxVersion,
    nvidiaCount: worker?.nvidiaCount,
    amdCount: worker?.amdCount,
    intelCount: worker?.intelCount
  }
  return (
    <div className={clsx(
      className,
      styles['wrapper']
    )}>
      <WorkerItemPanel worker={worker} onClick={() => isOpen.setValue(!isOpen.value)}/>
      <WorkerItemDropdown
        isOpen={isOpen.value}
        workerFlightSheetRender={() => 
          <WorkerItemFlightSheetTable flightSheets={worker?.flightSheetInfo} labels={labels}/>}
        workerInfoRender={() => <WorkerItemInfo workerInfo={workerInfo}/>}
      />
    </div>
  )
}