import { UiButton } from "@/shared/ui/ui-button";
import { WebsocketContext } from "@/shared/lib/providers/websocket-provider";
import { StateObject } from "@/shared/lib/utils/state-object";
import styles from './changeChartCoinButton.module.scss';
import clsx from "clsx";

export function ChangeChartCoinButton({
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
      color="opaque" 
      className={clsx(
        className,
        styles['change-chart-coin-button'],
      )}
      isActive={currentCoin.value === coin}
      onClick={() => { 
        if (coin === currentCoin.value) return
        WebsocketContext.invoke("SendCoin", coin);
        currentCoin.setValue(coin);
      }}
    >
      <span className={styles['text']}>{coin}</span>
    </UiButton>
  )
}