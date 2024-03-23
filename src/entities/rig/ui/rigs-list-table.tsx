import clsx from "clsx"
import _ from "lodash"
import React, { ReactNode } from "react" 
import { Rig as Type } from "../model/types"
import styles from './styles/rigsList.module.scss'
import { UiBorderBox } from "@/shared/ui/ui-border-box"

function RigsListTable({
  className,
  rigsList,
  renderRigItem
} : {
  className?: string;
  rigsList?: Type[];
  renderRigItem?: (rig?: Type) => ReactNode;
}) {
  const labels = [
    'ID', 'Name', 'GPUs', 
    'Active', 'Online', 'Average Temp', 
    'Fan', 'Power'
  ];
  return (
    <div className={clsx(
      className,
      styles['rig-list']
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
        <UiBorderBox className={styles['table-items']} withPadding>
          {_.map(rigsList, (rig) => renderRigItem?.(rig))}
        </UiBorderBox>
    </div>
  )
}

export const MemoizedRigsListTable = React.memo(RigsListTable);