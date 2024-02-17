import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { ChartData, LineChart } from "@/shared/lib/charts/line-chart";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './statisticCoin.module.scss';
import React, { ReactNode } from "react"; 
import clsx from "clsx";

export function CoinChart({
  className,
  values,
  renderCoinList
} : {
  className?: string;
  values?: ChartData[];
  coins?: string[];
  renderCoinList?: () => ReactNode;
}) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['wrapper']
    )}>
      {renderCoinList?.()}
      <UiBgContainer color='opaque' className={styles['container']}>
        <LineChart className={styles['chart']} lineColor="red" data={values} legend="MH/s"/>
      </UiBgContainer>
    </UiBorderBox> 
  )
}

export const MemoizedCoinChart = React.memo(CoinChart)