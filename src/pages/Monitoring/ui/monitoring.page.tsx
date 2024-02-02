import { StatisticCoinTable, TotalPower, TotalShares, TotalWorkers } from "@/entities/statistic";
import styles from './monitoring.page.module.scss'

export function Monitoring() {
  
  return (
    <div className={styles['wrapper']}>
      <article className={styles['slot-1']}>
        <TotalPower  className={styles['item-1']}/>
        <TotalWorkers className={styles['item-2']}/>
        <StatisticCoinTable className={styles['item-3']}/>
      </article>
      <article className={styles['slot-2']}>
        <TotalShares/>
      </article>
      <article className={styles['slot-3']}>

      </article>
    </div>
  )
}