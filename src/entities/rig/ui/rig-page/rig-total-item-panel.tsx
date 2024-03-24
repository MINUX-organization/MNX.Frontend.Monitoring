import clsx from 'clsx'
import styles from './styles/rigTotalItemPanel.module.scss'
import { UiBorderBox } from '@/shared/ui/ui-border-box'
import { RigTotal } from '../../model/types';
import { ReactNode } from 'react';
import { Circle } from 'lucide-react';
import { match } from 'ts-pattern';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';
import { RigTotalItemDevicesTable } from './rig-total-item-devices-table';

const green = '#43C09B';
const red = '#FC4E4E';

export function RigTotalItemPanel({
  className,
  rig,
  withFeatures = false,
  setIsOpen,
  renderEdit,
  renderSetting,
} : {
  className?: string;
  rig?: RigTotal
  withFeatures?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  renderEdit?: () => ReactNode;
  renderSetting?: () => ReactNode;
}) {
  const isActiveIcon = match(rig?.isActive)
    .with(true, () => <Circle fill={green} color={green} size={15}/>)
    .otherwise(() => <Circle fill={red} color={red} size={15}/>)
  
  return (
    <UiBorderBox className={clsx(
        className,
        styles['rig-total-item-panel']
      )}
    >
    <UiBgContainer className={styles['grid']} color="opaque">
      {isActiveIcon}
      <span className={styles['id']}>
        <span className={styles['blue']}>ID</span>
        {rig?.id}
      </span>
      <span className={styles['name']}>{rig?.name ?? 'N/A'}</span>
      {renderEdit?.()}
      <RigTotalItemDevicesTable rig={rig} />
      <span>
        {rig?.totalWatt.value ?? 'N/A'}&nbsp;
        <span className={styles['blue']}>{rig?.totalWatt.measureUnit}</span>
      </span>
      {withFeatures && 
        <div className={styles['features']}>
          {renderSetting?.()}
          {<button onClick={() => setIsOpen?.(true)}>Open</button>}
        </div>}
    </UiBgContainer>
  </UiBorderBox>
  )
}