import { UiButton } from "@/shared/ui/ui-button";
import { WebsocketContext } from "@/shared/lib/providers/websocket-context";
import { StateObject } from "@/shared/lib/utils/state-object";
import styles from './changeCoinChartButton.module.scss';
import clsx from "clsx";

export function ChangeCoinChartButton({
  className,
  currentCoin,
  coin
} : {
  className?: string;
  currentCoin: StateObject<string>;
  coin: string;
}) {
  return (
    <UiButton 
      variant="opaque" 
      className={clsx(
        className,
        styles['wrapper'],
      )}
      isActive={currentCoin.value === coin}
      onClick={() => { 
        if (coin === currentCoin.value) return
        WebsocketContext.invoke("SendCoin", coin)
        currentCoin.setValue(coin);
      }}
    >
      <span className={styles['text']}>{coin}</span>
    </UiButton>
  )
}