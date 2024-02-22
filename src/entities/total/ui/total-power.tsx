import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './totalPower.module.scss';
import clsx from "clsx";
import React from "react";
import { TotalPower as type } from "../model/types";

function TotalPower({
  className,
  value
} : {
  className?: string;
  value?: type;
}) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['total-power']
    )}>
      <UiBgContainer className={styles['container']} color="opaque">
        <span>Total Power</span>
        <span>{value?.value ?? 'N/A'}
          {value && <span className={styles['measure']}>&nbsp;{value?.measureUnit}</span>}
        </span>
      </UiBgContainer>
    </UiBorderBox>
  )
}

export const MemoizedTotalPower = React.memo(TotalPower)