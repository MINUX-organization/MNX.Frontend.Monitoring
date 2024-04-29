import clsx from "clsx";
import styles from './styles/gpuItemPanelGrid.module.scss'
import { Coin } from "../model/types";
import _ from "lodash";
import { UiTextTitleWrapper } from "@/shared/ui/ui-text-title-wrapper";

export function GpuItemPanelGrid({
  className,
  coinsList
} : {
  className?: string;
  coinsList?: Coin[];
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
        <span className={styles['text']}>Perfomance</span>
      </div>
      {_.map(coinsList, (coin) => (
        <div className={styles['gpu-panel-grid-items']}>
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