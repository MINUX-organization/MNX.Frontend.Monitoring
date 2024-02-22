import { UiButton } from "@/shared/ui/ui-button";
import styles from './powerOffButton.module.scss';
import clsx from "clsx";

export function PowerOffButton({
  className,
  workerId,
  workerIsOnline
} : {
  className?: string;
  workerId?: string;
  workerIsOnline?: boolean;
}) {
  return (
    <UiButton
      className={clsx(
        className,
        styles['wrapper']
      )}
      color="red"
      withBorder
      isClickable={workerIsOnline ?? false}
    >
      <span>POWER OFF</span>
    </UiButton>
  )
}