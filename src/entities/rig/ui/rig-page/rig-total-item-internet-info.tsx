import clsx from 'clsx';
import styles from './styles/rigTotalItemInternetInfo.module.scss';
import internetImage from '@/shared/assets/images/internet.svg';
import { RigInternetInfo } from '../..';
import { UiColumnBoard } from '@/shared/ui/ui-column-board';
import { ReactNode } from 'react';

export function RigTotalItemInternetInfo({
  className,
  rigInternetInfo,
  renderScan
} : {
  className?: string;
  rigInternetInfo: RigInternetInfo;
  renderScan?: () => ReactNode;
}) {
  const firstColumn = [
    { label: 'Model', value: rigInternetInfo.information.model },
    { label: 'Brand', value: rigInternetInfo.information.manufacturer },
    { label: 'Vendor Code', value: rigInternetInfo.information.vendorCode },
    { label: 'Bus Info', value: rigInternetInfo.information.busInfo },
  ]

  const secondColumn = [
    { label: 'Logical Name', value: rigInternetInfo.information.logicalName },
    { label: 'Serial Number', value: rigInternetInfo.information.serialNumber },
    { label: 'Local IP', value: rigInternetInfo.localIP },
    { label: 'Global IP', value: rigInternetInfo.globalIP },
    { 
      label: 'Internet', value: rigInternetInfo.isOnline ? 
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
        <span className={styles['internet-name']}>{rigInternetInfo.information.name}</span>
        <img width={60} src={internetImage} alt="internet" />
      </div>
      <UiColumnBoard className={styles['table']} data={firstColumn} />
      <UiColumnBoard className={styles['table']} data={secondColumn} />
      {renderScan?.()}
    </div>
  ) 
}