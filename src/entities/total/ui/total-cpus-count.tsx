import { FieldWidget, TotalCpusCount as type } from "../model/types";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiLabelBoard } from "@/shared/ui/ui-label-board";
import styles from './totalCount.module.scss';
import clsx from "clsx";
import React from "react";

type StatiscticCpuTableProps = {
  className?: string,
  value?: type
} 

function TotalCpusCount({
  className,
  value
} : StatiscticCpuTableProps) {
  const label = 'CPU';
  const fields: FieldWidget[] = [
    {label: 'Total', value: value?.total},
    {label: 'Intel', value: value?.intel, style: 'blue'},
    {label: 'AMD', value: value?.amd, style: 'red'},
  ]
  return (
    <UiLabelBoard
      className={clsx(
        className,
        styles['total-count']
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

export const MemoizedTotalCpusCount = React.memo(TotalCpusCount)