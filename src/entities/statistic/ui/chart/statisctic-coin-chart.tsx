import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { ChartDataValue, LineChart } from "@/shared/lib/charts/line-chart";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './statisticCoin.module.scss';
import React, { ReactNode } from "react"; 
import clsx from "clsx";
import _ from "lodash";

function StatisticCoinChart<T>({
  className,
  values,
  coins,
  renderCoins
} : {
  className?: string;
  values?: ChartDataValue[];
  coins?: T[];
  renderCoins?: (coin?: T) => ReactNode;
}) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['wrapper']
    )}>
      {_.map(coins, (coin) => (
        renderCoins?.(coin)
      ))}
      <UiBgContainer color='opaque' className={styles['container']}>
        <LineChart lineColor="red" data={values} legend="MH/s"/>
      </UiBgContainer>
    </UiBorderBox> 
  )
}

export const MemoizedStatisticCoinChart = React.memo(StatisticCoinChart)