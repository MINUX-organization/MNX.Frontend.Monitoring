import { UiButton } from "@/shared/ui/ui-button";
import styles from './rebootButton.module.scss';
import clsx from "clsx";

export function RebootButton({
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
      <span>REBOOT</span>
    </UiButton>
  )
}