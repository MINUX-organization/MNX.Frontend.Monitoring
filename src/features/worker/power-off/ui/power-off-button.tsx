import { UiButton } from "@/shared/ui/ui-button";
import styles from './powerOffButton.module.scss';
import clsx from "clsx";

export function PowerOffButton({
  className,
  workerId
} : {
  className?: string;
  workerId?: number;
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
      <span>POWER OFF</span>
    </UiButton>
  )
}