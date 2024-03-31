import clsx from 'clsx';
import styles from './styles/rigTotalItemInternetInfo.module.scss';
import { RigInternetInfo } from '../..';
import { UiColumnBoard } from '@/shared/ui/ui-column-board';
import { ReactNode } from 'react';

export function RigTotalItemInternetInfo({
  className,
  rigInternet,
  renderScan
} : {
  className?: string;
  rigInternet: RigInternetInfo;
  renderScan?: () => ReactNode;
}) {
  return (
    <div className={clsx(
      className,
      styles['rig-internet-info']
    )}>
      <div className={styles['internet']}>
        <span className={styles['internet-name']}>{rigInternet.name}</span>
        <img width={50} src={''} alt="internet" />
      </div>
      {/* <UiColumnBoard data={rigInternet} />
      <UiColumnBoard data={rigInternet} /> */}
      {renderScan?.()}
    </div>
  )
}