import { UiAside } from "@/shared/ui/ui-aside";
import { ChangeCoinChartButton } from "./change-coin-chart-button";
import { useStateObject } from "@/shared/lib/utils/state-object";
import styles from './changeCoinChartList.module.scss';
import { z } from "zod";
import clsx from "clsx";
import { useEffect } from "react";
import { WebsocketContext } from "@/shared/lib/providers/websocket-context";


export const CoinsChart = z.string().array();
export type CoinsChart = z.infer<typeof CoinsChart>;

export function ChangeCoinChartList({
  coins
} : {
  coins?: CoinsChart 
}) {
  const currentCoinChartObject = useStateObject<string>(coins ? coins[0] : '');

  useEffect(() => {
    if (!coins) return;
    currentCoinChartObject.setValue(coins ? coins[0] : '')
    WebsocketContext.invoke("SendCoin", currentCoinChartObject)
  }, [coins])

  if (!coins) return ( 
    <UiAside 
      className={clsx(
        styles['wrapper'],
        styles['non-data']
      )}
      variant="vertical">
        <span>N/A</span>
      </UiAside>
  )

  return (
    <UiAside 
      className={styles['wrapper']} 
      variant="vertical" 
      elements={coins} 
      renderElement={(element) => (
        <ChangeCoinChartButton 
          key={element} 
          className={styles['item']}
          currentCoin={currentCoinChartObject}
          coin={element}/>
      )}
    />
  )
}