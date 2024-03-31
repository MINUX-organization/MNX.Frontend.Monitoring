import clsx from 'clsx';
import styles from './styles/rigTotalItemInternetInfo.module.scss';
import { RigInternetInfo } from '../..';

export function RigTotalItemInternetInfo({
  className,
  rigInternet
} : {
  className?: string
  rigInternet: RigInternetInfo
}) {
  return (
    <div className={clsx(
      className,
      styles['rig-internet-info']
    )}>
      12345
    </div>
  )
}