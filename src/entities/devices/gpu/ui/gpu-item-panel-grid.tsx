import clsx from "clsx";
import styles from './styles/gpuItemPanelGrid.module.scss'
import { Coin } from "../model/types";
import _ from "lodash";

export function GpuItemPanelGrid({
  className,
  flightSheet
} : {
  className?: string;
  flightSheet?: Coin;
}) {
  return (
    <div className={clsx(
      className,
      styles['gpu-panel-grid']
    )}>
      <div className={styles['gpu-panel-grid-title']}>
        <span className={styles['text']}>Coin</span>
        <span className={styles['text']}>Hashrate</span>
        <span className={clsx(styles['span'], styles['text'])}>Shares</span>
        {/* <span className={styles['text']}>Perfomance</span> */}
      </div>
      {_.map(flightSheet?.coins, (coin) => (
        <div key={coin.coinName} className={styles['gpu-panel-grid-items']}>
          <span>{coin.coinName}</span>
          <span>
            {coin.hashRate ?? 0}&nbsp;
            <span className={styles['blue']}>{'Mh/s'}</span>
          </span>
          <span className={styles['shares-accepted']}>{coin.shares.accepted}</span>
          <span className={styles['shares-rejected']}>{coin.shares.rejected}</span>
          {/* <span>{coin.performance}</span> */}
        </div>
      ))}
    </div>
  )
}