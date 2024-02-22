import clsx from "clsx"
import _ from "lodash"
import React, { ReactNode, Suspense } from "react" 
import { Worker as Type } from "../model/types"
import styles from './styles/workersList.module.scss'
import { UiBorderBox } from "@/shared/ui/ui-border-box"

function WorkersList({
  className,
  workersList,
  renderWorkerItem
} : {
  className?: string;
  workersList?: Type[];
  renderWorkerItem?: (worker?: Type) => ReactNode;
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
          )}>
            {label}
          </span>
        ))}
      </div> 
      <Suspense fallback={isLoading()}>
        <UiBorderBox className={styles['table-items']} withPadding>
          {_.map(workersList, (worker) => renderWorkerItem?.(worker))}
        </UiBorderBox>
      </Suspense>
    </div>
  )
}

export const MemoizedWorkersList = React.memo(WorkersList);

function isLoading() {
  return <h2>Loading...</h2>
}