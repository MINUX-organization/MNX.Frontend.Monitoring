import clsx from "clsx";
import styles from './styles/workerItemDropdown.module.scss'
import { ReactNode } from "react";

export type FeaturesProps = {
  workerStartStopMiningRender?: () => ReactNode;
  workerPowerOffRender?: () => ReactNode;
  workerRebootRender?: () => ReactNode;
  workerRebootInRender?: () => ReactNode;
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
  workerStartStopMiningRender,
  workerPowerOffRender,
  workerRebootRender,
  workerRebootInRender,
  workerInfoRender
} : WorkerItemDropdownProps) {
  return (
    <div className={clsx(
      className,
      styles['wrapper'],
      isOpen && styles['active']
    )}>
      {workerFlightSheetRender?.()}
      <div className={styles['features']}>
        {workerStartStopMiningRender?.()}
        {workerPowerOffRender?.()}
        {workerRebootRender?.()}
        {workerRebootInRender?.()}
      </div>
      {workerInfoRender?.()}
    </div>
  )
}