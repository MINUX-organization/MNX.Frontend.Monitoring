import clsx from "clsx"
import styles from './styles/workerItem.module.scss'
import { Worker as Type, WorkerInfo } from "../model/types"
import { WorkerItemPanel } from "./worker-item-panel";
import { useStateObject } from "@/shared/lib/utils/state-object"; 
import { WorkerItemFlightSheetTable } from "./worker-item-flight-sheet-table";
import { FeaturesProps, WorkerItemDropdown } from "./worker-item-dropdown";
import { WorkerItemInfo } from "./worker-item-info";
import React from "react";

type WorkerItemProps = {
  className?: string;
  worker?: Type;
} & FeaturesProps 

function WorkerItem({
  className,
  worker,
  workerStopMiningRender,
  workerPowerOffRender,
  workerRebootRender,
  workerRebootInRender
} : WorkerItemProps) {
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
        workerStopMiningRender={workerStopMiningRender}
        workerPowerOffRender={workerPowerOffRender}
        workerRebootRender={workerRebootRender}
        workerRebootInRender={workerRebootInRender}
      />
    </div>
  )
}

export const MemoizedWorkerItem = React.memo(WorkerItem)