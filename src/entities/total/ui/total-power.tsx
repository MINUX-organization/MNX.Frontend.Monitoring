import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './totalPower.module.scss';
import clsx from "clsx";
import React from "react";
import { TotalPower as Type } from "../model/types";
import { match } from "ts-pattern";

function TotalPower({
  className,
  value
} : {
  className?: string;
  value?: Type;
}) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['total-power']
    )}>
      <UiBgContainer className={styles['container']} color="opaque">
        <span>Total Power</span>
        {match(value)
          .with(undefined, () => <span>N/A</span>)
          .otherwise((value) => (
            <span>
              {value}
              <span className={styles['measure']}>W</span>
            </span>
          ))}
      </UiBgContainer>
    </UiBorderBox>
  )
}

export const MemoizedTotalPower = React.memo(TotalPower)