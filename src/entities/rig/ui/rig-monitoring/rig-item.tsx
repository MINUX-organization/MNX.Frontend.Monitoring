import clsx from "clsx"
import styles from './styles/rigItem.module.scss'
import { Rig, RigInfo } from "../../model/types"
import { RigItemPanel } from "./rig-item-panel";
import { useStateObject } from "@/shared/lib/utils/state-object"; 
import { RigCoinTable } from "./rig-item-coin-table";
import { FeaturesProps, RigItemDropdown } from "./rig-item-dropdown";
import { RigItemInfo } from "./rig-item-info";
import React from "react";

type RigItemProps = {
  className?: string;
  rig?: Rig;
} & FeaturesProps 

function RigItem({
  className,
  rig,
  renderRigStartStopMining,
  renderRigPowerOff,
  renderRigReboot,
  renderRigRebootIn
} : RigItemProps) {
  const isOpen = useStateObject<boolean>(false);

  const labels = [
    'Coin', 'Flight Sheet', 'Miner', 
    'Hashrate', 'Shares Accepted', 'Shares Rejected'
  ];

  const rigInfo: Partial<RigInfo> = {
    miningUpTime: rig?.miningUpTime,
    bootedUpTime: rig?.bootedUpTime,
    localIp: rig?.localIp,
    minuxVersion: rig?.minuxVersion,
    nvidiaCount: rig?.countDevices.totalGpusCountGroupedByManufacturer['nvidia'],
    amdCount: rig?.countDevices.totalGpusCountGroupedByManufacturer['amd'],
    intelCount: rig?.countDevices.totalGpusCountGroupedByManufacturer['intel'],
  }

  return (
    <div className={clsx(
      className,
      styles['rig-item']
    )}>
      <RigItemPanel rig={rig} onClick={() => isOpen.setValue(!isOpen.value)}/>
      <RigItemDropdown
        isOpen={isOpen.value}
        rigFlightSheetRender={() => 
          <RigCoinTable flightSheets={rig?.totalCoinStatistics} labels={labels}/>}
        rigInfoRender={() => <RigItemInfo rigInfo={rigInfo}/>}
        renderRigStartStopMining={renderRigStartStopMining}
        renderRigPowerOff={renderRigPowerOff}
        renderRigReboot={renderRigReboot}
        renderRigRebootIn={renderRigRebootIn}
      />
    </div>
  )
}

export const MemoizedRigItem = React.memo(RigItem)