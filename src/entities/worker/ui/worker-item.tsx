import { UiBgContainer } from "@/shared/ui/ui-bg-container"
import { WorkerList as Type } from "../model/types"
import styles from './workerItem.module.scss'
import clsx from "clsx"

export function WorkerItem({
  className,
  worker
} : {
  className?: string;
  worker?: Type;
}) {
  return (
    <div className={clsx(
      className,
      styles['wrapper']
    )}>
      <UiBgContainer 
        className={styles['grid-container']} 
        color="opaque"
      >
        <span className={styles['item-1']}>{worker?.id ?? 'N/A'}</span>
        <span className={styles['item-2']}>{worker?.name ?? 'N/A'}</span>
        <span className={styles['item-3']}>{worker?.gpus ?? 'N/A'}</span>
        <span className={styles['item-4']}>{worker?.isActive ?? 'N/A'}</span>
        <div className={styles['item-5']}>
          <span>{worker?.online ?? 'N/A'}</span>
          <span>{worker?.online && (worker?.onlineSpeed.value ?? 'N/A')}</span>
        </div>
        <span className={styles['item-6']}>{worker?.averageTemp ?? 'N/A'}</span>
        <span className={styles['item-7']}>{worker?.fan ?? 'N/A'}</span>
        <div className={styles['item-8']}>
          <span>{worker?.power.value ?? 'N/A'}</span>
          <span>{worker?.power.value && (worker?.power.measureUnit ?? 'N/A')}</span>
        </div>
      </UiBgContainer>
    </div>
  )
}