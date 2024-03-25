import clsx from 'clsx'
import styles from './styles/rigTotalItemPanel.module.scss'
import { UiBorderBox } from '@/shared/ui/ui-border-box'
import { RigTotal } from '../../model/types';
import { Dispatch, ReactNode } from 'react';
import { Circle } from 'lucide-react';
import { match } from 'ts-pattern';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';
import { RigTotalItemDevicesTable } from './rig-total-item-devices-table';

const green = '#43C09B';
const red = '#FC4E4E';

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
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  renderEdit?: () => ReactNode;
  renderSetting?: (index: number) => ReactNode;
  renderOnOpen?: (setIsOpen?: Dispatch<React.SetStateAction<boolean>>) => ReactNode;
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
      <span className={styles['index']}>
        <span className={styles['blue']}>ID</span>&nbsp;
        {rig.index}
      </span>
      <span className={styles['name']}>{rig.name}</span>
      {renderEdit?.()}
      <RigTotalItemDevicesTable rig={rig} />
      <span>
        {rig.totalWatt.value}&nbsp;
        <span className={styles['blue']}>{rig.totalWatt.measureUnit}</span>
      </span>
      {setIsOpen && 
        <div className={styles['features']}>
          {renderSetting?.(rig.index)}
          {renderOnOpen?.(setIsOpen)}
        </div>}
    </UiBgContainer>
  </UiBorderBox>
  )
}