import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { TotalCoinValue as Type } from "../model/types";
import styles from './totalCoinsList.module.scss';
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import clsx from "clsx";
import _ from "lodash";
import React from "react";

const titles: string[] = [
  'Coin',
  'Algorithm',
  'Value',
  'Shares Accepted',
  'Shares Rejected'
] as const

function TotalCoinValue({
  className,
  values,
} : {
  className: string,
  values?: Type[]
}) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['total-coin-list']
    )}>
      <UiBgContainer className={styles['slot-1']} color="opaque">
        {_.map(titles, (title) => (
          <span key={title} className={styles['title-text']}>{title}</span>
        ))}
      </UiBgContainer>
      <div className={clsx(
        styles['line'],
        styles['slot-2']
      )}>
      </div>
      <UiBgContainer className={styles['slot-3']} color="opaque">
        {_.map(values, (value) => (
          <div key={value.coin} className={styles['subgrid']}>
            <span>{value.coin}</span>
            <span>{value.algorithmName}</span>
            <span>{value.hashrate.value}&nbsp;
              <span className={styles['measure']}>{value.hashrate.measureUnit}</span>
            </span>
            <span className={styles['accepted']}>{value.shares.accepted}</span>
            <span className={styles['rejected']}>{value.shares.rejected}</span>  
          </div>
        ))}
      </UiBgContainer>
    </UiBorderBox>
  )
}

export const MemoizedTotalCoinsList = React.memo(TotalCoinValue)