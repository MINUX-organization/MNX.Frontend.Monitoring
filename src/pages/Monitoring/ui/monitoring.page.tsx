import { StatisticCoinTable, StatisticCpuWidget, StatisticGpuWidget, TotalPower, TotalShares, TotalWorkers } from "@/entities/statistic";
import styles from './monitoring.page.module.scss'
import { StatisticCoinChart } from "@/entities/statistic/ui/chart/statisctic-coin-chart";
import { useState } from "react";
import { random } from "lodash";
import { ChartDataValue } from "@/shared/lib/charts/line-chart";

export function Monitoring() {
  const [v, setV] = useState<ChartDataValue[]>([])
  return (
    <div className={styles['wrapper']}>
      <article className={styles['slot-1']}>
        <TotalPower className={styles['item-1']}/>
        <TotalWorkers className={styles['item-2']}/>
        <StatisticCoinTable className={styles['item-3']}/>
      </article>
      <article className={styles['slot-2']}>
        <TotalShares className={styles['item-1']}/>
        <StatisticGpuWidget className={styles['item-2']}/>
        <StatisticCpuWidget className={styles['item-3']}/>
        <div className={styles['item-4']} onClick={() => setV([...v, {time: (v.length + 1).toString(), value: random(0.5)}])}>
          <StatisticCoinChart  data={v}/> 
        </div>
      </article>
      <article className={styles['slot-3']}>
      </article>
    </div>
  )
}