import clsx from 'clsx'
import styles from './styles/rigTotalItemPanel.module.scss'
import { UiBorderBox } from '@/shared/ui/ui-border-box'
import { RigTotal } from '../../model/types';
import { Dispatch, ReactNode } from 'react';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';
import { RigTotalItemDevicesTable } from './rig-total-item-devices-table';
import { UiActiveState } from '@/shared/ui/ui-active-state';
import { UiWiFiState } from '@/shared/ui/ui-wifi-state';

export function RigTotalItemPanel({
  className,
  rig,
  setIsOpen,
  renderEdit,
  renderSetting,
  renderOnOpen
} : {
  className?: string;
  rig: RigTotal
  setIsOpen?: Dispatch<React.SetStateAction<boolean>>;
  renderEdit?: () => ReactNode;
  renderSetting?: (id: string) => ReactNode;
  renderOnOpen?: (setIsOpen?: Dispatch<React.SetStateAction<boolean>>) => ReactNode;
}) {
  return (
    <UiBorderBox className={clsx(
        className,
        styles['rig-total-item-panel']
      )}
    >
    <UiBgContainer className={styles['grid']} color="opaque">
      <span className={styles['index']}>
        <UiActiveState isActive={rig.isActive} />
        <span>
          <span className={styles['blue']}>ID</span>&nbsp;
          {rig.index}
        </span>
      </span>
      <div className={styles['name']}>
        {rig.name}
        {renderEdit?.()}
      </div>
      <RigTotalItemDevicesTable rig={rig} />
      <div className={styles['states']}>
        <UiWiFiState className={styles['wifi']} onlineState={rig.onlineState} />
        <span>
          {rig.power.value}&nbsp;
          <span className={styles['blue']}>{rig.power.measureUnit}</span>
        </span>
      </div>
      {setIsOpen && 
        <div className={styles['features']}>
          {renderSetting?.(rig.id)}
          {renderOnOpen?.(setIsOpen)}
        </div>}
    </UiBgContainer>
  </UiBorderBox>
  )
}