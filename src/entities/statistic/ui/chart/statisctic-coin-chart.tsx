import { ChartData, LineChart } from "@/shared/lib/charts/line-chart";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './statisticCoin.module.scss';
import { ReactNode } from "react"; 
import clsx from "clsx";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";

export function StatisticCoinChart<T>({
  className,
  data,
  coins,
  renderCoins
} : {
  className?: string;
  data?: ChartData[];
  coins?: T[];
  renderCoins?: (coin?: T) => ReactNode;
}) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['wrapper']
    )}>
      <UiBgContainer color='opaque'>
        <LineChart lineColor="red" data={data} legend="MH/s"/>
      </UiBgContainer>
    </UiBorderBox> 
  )
}