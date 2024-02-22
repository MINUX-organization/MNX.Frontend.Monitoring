import { UiButton } from "@/shared/ui/ui-button";
import styles from './startStopMiningButton.module.scss';
import clsx from "clsx";

export function StartStopMiningButton({
  className,
  workerId,
  workerIsActive,
  workerIsOnline
} : {
  className?: string;
  workerId?: string;
  workerIsActive?: boolean;
  workerIsOnline?: boolean;
}) {
  const text = workerIsActive ? 'START MINING' : 'STOP MINING'
  const color = workerIsActive ? 'blue' : 'red'
  return (
    <UiButton 
    className={clsx(
      className,
      styles['wrapper']
      )}
      color={color}
      withBorder
      isClickable={workerIsOnline ?? false}
    >
      <span>{text}</span>
    </UiButton>
  )
}