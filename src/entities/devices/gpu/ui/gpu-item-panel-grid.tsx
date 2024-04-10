import clsx from "clsx";
import styles from './styles/gpuItemPanelGrid.module.scss'
import { Coin } from "../model/types";
import _ from "lodash";
import { UiTextTitleWrapper } from "@/shared/ui/ui-text-title-wrapper";

export function GpuItemPanelGrid({
  className,
  coinsList
} : {
  className: string;
  coinsList: Coin[];
}) {
  return (
    <div className={clsx(
      className,
      styles['gpu-panel-grid']
    )}>
      <div className={styles['gpu-panel-grid-title']}>
        <UiTextTitleWrapper text="Coin" />
        <UiTextTitleWrapper text="Hashrate" />
        <UiTextTitleWrapper className={styles['span']} text="Shares" />
        <UiTextTitleWrapper text="Perfomance" />
      </div>
      {_.map(coinsList, (coin) => (
        <div className={styles['gpu-panel-grid-items']}>
          <span>{coin.coin}</span>
          <span>
            {coin.hashrate.value}&nbsp;
            <span>{coin.hashrate.measureUnit}</span>
          </span>
          <span>{coin.shares.accepted}</span>
          <span>{coin.shares.rejected}</span>
          <span>{coin.performance}</span>
        </div>
      ))}
    </div>
  )
}