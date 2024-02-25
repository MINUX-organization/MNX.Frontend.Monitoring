import clsx from "clsx";
import styles from './styles/workerItemDropdown.module.scss'
import { ReactNode } from "react";

export type FeaturesProps = {
  renderWorkerStartStopMining?: () => ReactNode;
  renderWorkerPowerOff?: () => ReactNode;
  renderWorkerReboot?: () => ReactNode;
  renderWorkerRebootIn?: () => ReactNode;
}

export type WorkerItemDropdownProps = {
  className?: string;
  isOpen?: boolean;
  workerFlightSheetRender?: () => ReactNode;
  workerInfoRender?: () => ReactNode;
} & FeaturesProps

export function WorkerItemDropdown({
  className,
  isOpen,
  workerFlightSheetRender,
  renderWorkerStartStopMining,
  renderWorkerPowerOff,
  renderWorkerReboot,
  renderWorkerRebootIn,
  workerInfoRender
} : WorkerItemDropdownProps) {
  return (
    <div className={clsx(
      className,
      styles['worker-item-dropdown'],
      isOpen && styles['active']
    )}>
      {workerFlightSheetRender?.()}
      <div className={styles['features']}>
        {renderWorkerStartStopMining?.()}
        {renderWorkerPowerOff?.()}
        {renderWorkerReboot?.()}
        {renderWorkerRebootIn?.()}
      </div>
      {workerInfoRender?.()}
    </div>
  )
}