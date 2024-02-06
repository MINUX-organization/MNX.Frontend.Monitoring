import { UiBgContainer } from "@/shared/ui/ui-bg-container"
import styles from './statiscticWidgets.module.scss'
import { FieldWidget, Shares } from "../../model/types"
import clsx from "clsx"
import { UiLabelBoard } from "@/shared/ui/ui-label-board"
import React from "react"

type TotalSharesProps = {
  className?: string,
  value?: Shares
}

function TotalShares({
  className,
  value
} : TotalSharesProps) {
  const label = 'Total Shares';
  const fields: FieldWidget[] = [
    {label: 'Accepted', value: value?.accepted, style: 'green'},
    {label: 'Rejected', value: value?.rejected, style: 'red'},
  ]
  return (
    <UiLabelBoard
      className={clsx(
        className,
        styles['wrapper']
      )}
      label={label} 
      options={fields}
      renderLabel={(label) => (
        <UiBgContainer className={styles['label']} color="opaque">
          <span>{label}</span>
        </UiBgContainer>)}
      renderOption={(option) => (
        <UiBgContainer key={option.label} color="opaque" className={clsx(
          styles['text-gray']
        )}>
          <span>{option.label}</span>
          <br/>
          <span className={styles[`${option.style}`]}>{option.value ?? 'N/A'}</span>
        </UiBgContainer>
      )}
    />
  )
}

export const MemoizedTotalShares = React.memo(TotalShares)