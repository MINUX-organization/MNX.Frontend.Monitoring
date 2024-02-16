import clsx from "clsx";
import styles from './styles/workerItemDropdown.module.scss'
import { ReactNode } from "react";

export function WorkerItemDropdown({
  className,
  isOpen,
  workerFlightSheetRender,
  workerStopMiningRender,
  workerPowerOffRender,
  workerRebootRender,
  workerRebootInRender,
  workerInfoRender
} : {
  className?: string;
  isOpen?: boolean;
  workerFlightSheetRender?: () => ReactNode;
  workerStopMiningRender?: () => ReactNode;
  workerPowerOffRender?: () => ReactNode;
  workerRebootRender?: () => ReactNode;
  workerRebootInRender?: () => ReactNode;
  workerInfoRender?: () => ReactNode;
}) {
  return (
    <div className={clsx(
      className,
      styles['wrapper'],
      isOpen && styles['active']
    )}>
      {workerFlightSheetRender?.()}
      <div className={styles['features']}>
        {workerStopMiningRender?.()}
        {workerPowerOffRender?.()}
        {workerRebootRender?.()}
        {workerRebootInRender?.()}
      </div>
      {workerInfoRender?.()}
    </div>
  )
}