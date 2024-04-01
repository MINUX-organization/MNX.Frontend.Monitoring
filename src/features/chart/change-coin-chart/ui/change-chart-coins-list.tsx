import { UiAside } from "@/shared/ui/ui-aside";
import { ChangeChartCoinButton } from "./change-chart-coin-button";
import { useStateObject } from "@/shared/lib/utils/state-object";
import styles from './changeChartCoinsList.module.scss';
import { z } from "zod";
import clsx from "clsx";
import { useEffect } from "react";
import { WebsocketContext } from "@/widgets/providers/websocket-provider";
import React from "react";


export const CoinChartList = z.string().array();
export type CoinChartList = z.infer<typeof CoinChartList>;

function ChangeChartCoinsList({
  coinsList
} : {
  coinsList?: CoinChartList 
}) {
  const currentCoinChartObject = useStateObject<string>(coinsList ? coinsList[0] : '');
  useEffect(() => {
    if (!coinsList) return;
    currentCoinChartObject.setValue(coinsList ? coinsList[0] : '')
    WebsocketContext.invoke("SendCoin", currentCoinChartObject)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinsList])
  if (!coinsList) return ChangeCoinChartListEmpty()
  return (
    <UiAside 
      className={styles['change-chart-coins-list']} 
      variant="vertical" 
      elements={coinsList} 
      renderElement={(element) => (
        <ChangeChartCoinButton 
          key={element} 
          className={styles['item']}
          currentCoin={currentCoinChartObject}
          coin={element}/>
      )}
    />
  )
}

function ChangeCoinChartListEmpty() {
  return (
    <UiAside 
      className={clsx(
        styles['change-chart-coins-list'],
        styles['non-data']
      )}
      variant="vertical"
    >
      <span>N/A</span>
    </UiAside>
  )
}

export const MemoizedChangeChartCoinsList = React.memo(ChangeChartCoinsList)