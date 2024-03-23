import clsx from "clsx";
import styles from './styles/rigItemDropdown.module.scss'
import { ReactNode } from "react";

export type FeaturesProps = {
  renderRigStartStopMining?: () => ReactNode;
  renderRigPowerOff?: () => ReactNode;
  renderRigReboot?: () => ReactNode;
  renderRigRebootIn?: () => ReactNode;
}

export type RigItemDropdownProps = {
  className?: string;
  isOpen?: boolean;
  rigFlightSheetRender?: () => ReactNode;
  rigInfoRender?: () => ReactNode;
} & FeaturesProps

export function RigItemDropdown({
  className,
  isOpen,
  rigFlightSheetRender,
  renderRigStartStopMining,
  renderRigPowerOff,
  renderRigReboot,
  renderRigRebootIn,
  rigInfoRender
} : RigItemDropdownProps) {
  return (
    <div className={clsx(
      className,
      styles['rig-item-dropdown'],
      isOpen && styles['active']
    )}>
      {rigFlightSheetRender?.()}
      <div className={styles['features']}>
        {renderRigStartStopMining?.()}
        {renderRigPowerOff?.()}
        {renderRigReboot?.()}
        {renderRigRebootIn?.()}
      </div>
      {rigInfoRender?.()}
    </div>
  )
}