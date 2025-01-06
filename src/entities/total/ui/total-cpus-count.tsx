import { FieldWidget } from "../model/types";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiLabelBoard } from "@/shared/ui/ui-label-board";
import styles from './totalCount.module.scss';
import clsx from "clsx";
import React from "react";
import { TotalDevices } from "@/pages/monitoring";

type StatiscticCpuTableProps = {
  className?: string,
  value?: TotalDevices
} 

function TotalCpusCount({
  className,
  value
} : StatiscticCpuTableProps) {
  const label = 'CPU';
  const fields: FieldWidget[] = [
    {label: 'Total', value: value?.totalCpusCount ?? 0},
    {label: 'Intel', value: value?.totalCpusCountGroupedByManufacturer['intel'] ?? 0, style: 'blue'},
    {label: 'AMD', value: value?.totalCpusCountGroupedByManufacturer['amd'] ?? 0, style: 'red'},
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