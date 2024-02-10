import { UiButton } from "@/shared/ui/ui-button";
import styles from './changCoinChartButton.module.scss';
import clsx from "clsx";

export function ChangeCoinChartButton({
  className,
  coin
} : {
  className: string;
  coin: string
}) {

  return (
    <UiButton variant="opaque" className={clsx(
      className,
      styles['wrapper'],
    )}>
      <span>{coin}</span>
    </UiButton>
  )
}