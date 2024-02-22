import { UiButton } from "@/shared/ui/ui-button";
import styles from './rebootButton.module.scss';
import clsx from "clsx";

export function RebootButton({
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
      color="blue"
      withBorder
      isClickable={workerIsOnline ?? false}
    >
      <span>REBOOT</span>
    </UiButton>
  )
}