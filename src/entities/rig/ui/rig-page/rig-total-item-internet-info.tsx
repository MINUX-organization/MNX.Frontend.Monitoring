import clsx from 'clsx';
import styles from './styles/rigTotalItemInternetInfo.module.scss';
import internetImage from '@/shared/assets/images/internet.svg';
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
  const firstColumn = [
    { label: 'Model', value: rigInternet.model },
    { label: 'Brand', value: rigInternet.brand },
    { label: 'Vendor Code', value: rigInternet.vendorCode },
    { label: 'Bus Info', value: rigInternet.busInfo },
  ]

  const secondColumn = [
    { label: 'Logical Name', value: rigInternet.logicalName },
    { label: 'Serial Number', value: rigInternet.serialNumber },
    { label: 'IP', value: rigInternet.ip },
    { 
      label: 'Internet', value: rigInternet.isOnline ? 
        <span className={styles['online']}>Online</span> : 
          <span className={styles['offline']}>Offline</span> 
    },
  ]

  return (
    <div className={clsx(
      className,
      styles['rig-internet-info']
    )}>
      <div className={styles['internet']}>
        <span className={styles['internet-name']}>{rigInternet.name}</span>
        <img width={60} src={internetImage} alt="internet" />
      </div>
      <UiColumnBoard data={firstColumn} />
      <UiColumnBoard data={secondColumn} />
      {renderScan?.()}
    </div>
  ) 
}