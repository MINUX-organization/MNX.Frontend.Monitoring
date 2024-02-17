import { UiButton } from "@/shared/ui/ui-button";
import styles from './stopMiningButton.module.scss';
import clsx from "clsx";

export function StopMiningButton({
  className,
  workerId
} : {
  className?: string;
  workerId?: string;
}) {
  return (
    <UiButton
      className={clsx(
        className,
        styles['wrapper']
      )}
      color="red"
      withBorder
    >
      <span>STOP MINING</span>
    </UiButton>
  )
}