import clsx from "clsx"
import { WorkerList as Type } from "../model/types"
import styles from './workerList.module.scss'
import _ from "lodash"
import { UiBorderBox } from "@/shared/ui/ui-border-box"
import { WorkerItem } from "./worker-item"


export function WorkerList({
  className,
  workers
} : {
  className?: string;
  workers?: Type[];
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
          <span className={clsx(
            styles['text-label'],
            styles[`item-${index + 1}`]
          )}>{label}</span>
        ))}
      </div> 
      <UiBorderBox className={styles['table-info']} withPadding>
        <WorkerItem/>
      </UiBorderBox> 
    </div>
  )
}
