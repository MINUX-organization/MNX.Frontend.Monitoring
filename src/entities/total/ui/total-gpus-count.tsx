import { FieldWidget, TotalGpusCount as type } from "../model/types";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiLabelBoard } from "@/shared/ui/ui-label-board";
import styles from './totalCount.module.scss';
import clsx from "clsx";
import React from "react";

function TotalGpusCount({
  className,
  value
} : {
  className?: string;
  value?: type;
}) {
  const label = 'GPU'
  const fields: FieldWidget[] = [
    {label: 'Total', value: value?.total},
    {label: 'Nvidia', value: value?.nvidia, style: 'green'},
    {label: 'AMD', value: value?.amd, style: 'red'},
    {label: 'Intel', value: value?.intel, style: 'blue'},
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