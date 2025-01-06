import { FieldWidget } from "../model/types";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiLabelBoard } from "@/shared/ui/ui-label-board";
import styles from './totalCount.module.scss';
import clsx from "clsx";
import React from "react";
import { TotalDevices } from "@/pages/monitoring";

function TotalGpusCount({
  className,
  value
} : {
  className?: string;
  value?: TotalDevices;
}) {
  const label = 'GPU'
  const fields: FieldWidget[] = [
    {label: 'Total', value: value?.totalGpusCount ?? 0},
    {label: 'Nvidia', value: value?.totalGpusCountGroupedByManufacturer['nvidia'] ?? 0, style: 'green'},
    {label: 'AMD', value: value?.totalGpusCountGroupedByManufacturer['amd'] ?? 0, style: 'red'},
    {label: 'Intel', value: value?.totalGpusCountGroupedByManufacturer['intel'] ?? 0, style: 'blue'},
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

export const MemoizedTotalGpusCount = React.memo(TotalGpusCount)