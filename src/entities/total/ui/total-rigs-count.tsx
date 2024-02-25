import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './totalRigsCount.module.scss';
import clsx from "clsx";
import React from "react";
import { TotalRigsCount as type } from "../model/types";

function TotalRigsCount({
  className,
  value
} : {
  className?: string;
  value?: type
}) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['total-rigs-count']
    )}>
      <UiBgContainer className={styles['container']} color="opaque">
        <span>Total Rigs</span>
        <span>{value ?? 'N/A'}</span>
      </UiBgContainer>
    </UiBorderBox>
  )
}

export const MemoizedTotalRigsCount = React.memo(TotalRigsCount)