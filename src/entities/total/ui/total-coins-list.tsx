import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { CoinStatistic } from "../model/types";
import styles from './totalCoinsList.module.scss';
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import clsx from "clsx";
import _ from "lodash";
import React from "react";

const titles: string[] = [
  'Coin',
  'Hashrate',
  'Shares Accepted',
  'Shares Rejected'
] as const

function TotalCoinValue({
  className,
  values,
} : {
  className: string,
  values?: CoinStatistic[]
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
          <div key={value.coinName} className={styles['subgrid']}>
            <span>{value.coinName}</span>
            <span>{value.hashRate}&nbsp;
              <span className={styles['measure']}>{"W"}</span>
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