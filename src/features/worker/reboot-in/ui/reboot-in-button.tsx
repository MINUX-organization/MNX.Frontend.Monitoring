import { UiButton } from "@/shared/ui/ui-button";
import styles from './rebootInButton.module.scss';
import clsx from "clsx";

export function RebootInButton({
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
      color="blue"
      withBorder
    >
      <span>REBOOT IN 30s</span>
    </UiButton>
  )
}