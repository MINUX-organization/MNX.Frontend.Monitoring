import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './totalPower.module.scss';
import clsx from "clsx";
import { MeasureUnit } from "@/shared/types/measure-unit";
import React from "react";

function TotalPower({
  className,
  value
} : {
  className?: string;
  value?: MeasureUnit;
}) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['wrapper']
    )}>
      <UiBgContainer className={styles['container']} color="opaque">
        <span>Total Power</span>
        <span>{value?.value ?? 'N/A'}&nbsp;
          <span className={styles['measure']}>{value?.measureUnit}</span>
        </span>
      </UiBgContainer>
    </UiBorderBox>
  )
}

export const MemoizedTotalPower = React.memo(TotalPower)