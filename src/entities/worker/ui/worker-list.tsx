import clsx from "clsx"
import { Worker as Type } from "../model/types"
import styles from './styles/workerList.module.scss'
import _ from "lodash"
import { UiBorderBox } from "@/shared/ui/ui-border-box"
import { WorkerItem } from "./worker-item"
import React, { ReactNode } from "react" 

function WorkerList({
  className,
  workers,
  renderWorkerItem
} : {
  className?: string;
  workers?: Type[];
  renderWorkerItem?: (worker: Type) => ReactNode;
}) {
  const labels = [
    'ID', 'Name', 'GPUs', 
    'Active', 'Online', 'Average Temp', 
    'Fan', 'Power'
  ];
  return (
    <div className={clsx(
      className,
      styles['wrapper']
    )}>
      <div className={styles['table-label']}>
        {_.map(labels, (label, index) => (
          <span 
            key={index} 
            className={clsx(
              styles['text-label'],
              styles[`item-${index + 1}`]
          )}>{label}</span>
        ))}
      </div> 
      <UiBorderBox className={styles['table-items']} withPadding>
        {_.map(workers, (worker) => renderWorkerItem?.(worker))}
      </UiBorderBox> 
    </div>
  )
}

export const MemoizedWorkerList = React.memo(WorkerList);