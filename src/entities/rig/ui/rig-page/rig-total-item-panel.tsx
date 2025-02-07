import clsx from 'clsx'
import styles from './styles/rigTotalItemPanel.module.scss'
import { UiBorderBox } from '@/shared/ui/ui-border-box'
import { RigTotal } from '../../model/types';
import { ReactNode } from 'react';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';
import { RigTotalItemDevicesTable } from './rig-total-item-devices-table';
// import { UiActiveState } from '@/shared/ui/ui-active-state';
// import { UiWiFiState } from '@/shared/ui/ui-wifi-state';
import { StateObject } from '@/shared/lib/utils/state-object';

export function RigTotalItemPanel({
  className,
  rig,
  isOpen,
  renderEdit,
  renderSetting,
  renderOnOpen,
  renderStartMining,
  withFeatures,
} : {
  className?: string;
  rig: RigTotal;
  isOpen?: StateObject<boolean>;
  withFeatures?: boolean;
  renderEdit?: () => ReactNode;
  renderStartMining?: (id: string) => ReactNode;
  renderSetting?: (id: string) => ReactNode;
  renderOnOpen?: (isOpen?: StateObject<boolean>) => ReactNode;
}) {
  return (
    <UiBorderBox className={clsx(
        className,
        styles['rig-total-item-panel']
      )}
    >
    <UiBgContainer className={styles['grid']} color="opaque">
      <span className={styles['index']}>
        {/* <UiActiveState isActive={rig.isActive} /> */}
        {/* <span>
          <span className={styles['blue']}>ID</span>&nbsp;
          {rig.index}
        </span> */}
      </span>
      <div className={styles['name']}>
        {rig.name}
        {renderEdit?.()}
      </div>
      <RigTotalItemDevicesTable rig={rig} />
      <div className={styles['states']}>
        {/* <UiWiFiState className={styles['wifi']} onlineState={rig.onlineState} /> */}
      </div>
      {withFeatures && 
        <div className={styles['features']}>
          {renderStartMining?.(rig.id)}
          {renderSetting?.(rig.id)}
          {renderOnOpen?.(isOpen)}
        </div>}
    </UiBgContainer>
  </UiBorderBox>
  )
}