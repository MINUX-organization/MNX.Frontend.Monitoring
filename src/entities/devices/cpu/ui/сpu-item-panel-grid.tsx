import clsx from "clsx";
import styles from './сpuItemPanelGrid.module.scss'
import { Coin } from "../model/types";
import _ from "lodash";

export function CpuItemPanelGrid({
  className,
  coinsList
} : {
  className?: string;
  coinsList?: Coin[];
}) {
  return (
    <div className={clsx(
      className,
      styles['cpu-panel-grid']
    )}>
      <div className={styles['cpu-panel-grid-title']}>
        <span className={styles['text']}>Coin</span>
        <span className={styles['text']}>Hashrate</span>
        <span className={clsx(styles['span'], styles['text'])}>Shares</span>
        <span className={styles['text']}>Perfomance</span>
      </div>
      {_.map(coinsList, (coin) => (
        <div key={coin.coin} className={styles['cpu-panel-grid-items']}>
          <span>{coin.coin}</span>
          <span>
            {coin.hashrate.value}&nbsp;
            <span className={styles['blue']}>{coin.hashrate.measureUnit}</span>
          </span>
          <span className={styles['shares-accepted']}>{coin.shares.accepted}</span>
          <span className={styles['shares-rejected']}>{coin.shares.rejected}</span>
          <span>{coin.performance}</span>
        </div>
      ))}
    </div>
  )
}