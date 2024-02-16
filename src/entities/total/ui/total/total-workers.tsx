import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './totalWorkers.module.scss';
import clsx from "clsx";
import React from "react";
import { TotalWorkers as type } from "../../model/types";

function TotalWorkers({
  className,
  value
} : {
  className?: string;
  value?: type
}) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['wrapper']
    )}>
      <UiBgContainer className={styles['container']} color="opaque">
        <span>Total Workers</span>
        <span>{value ?? 'N/A'}</span>
      </UiBgContainer>
    </UiBorderBox>
  )
}

export const MemoizedTotalWorkers = React.memo(TotalWorkers)