import { UiButton } from "@/shared/ui/ui-button";
import styles from './rebootInButton.module.scss';
import clsx from "clsx";

export function RebootInButton({
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
      <span>REBOOT IN 30s</span>
    </UiButton>
  )
}