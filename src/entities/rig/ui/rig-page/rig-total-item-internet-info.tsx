import clsx from 'clsx';
import styles from './styles/rigTotalItemInternetInfo.module.scss';

export function RigTotalItemInternetInfo({
  className
} : {
  className?: string
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