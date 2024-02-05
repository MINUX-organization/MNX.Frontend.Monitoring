import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { ChartDataValue, LineChart } from "@/shared/lib/charts/line-chart";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './statisticCoin.module.scss';
import { ReactNode } from "react"; 
import clsx from "clsx";
import _ from "lodash";

export function StatisticCoinChart<T>({
  className,
  data,
  coins,
  renderCoins
} : {
  className?: string;
  data?: ChartDataValue[];
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
      <UiBgContainer color='opaque'>
        <LineChart lineColor="red" data={data} legend="MH/s"/>
      </UiBgContainer>
    </UiBorderBox> 
  )
}