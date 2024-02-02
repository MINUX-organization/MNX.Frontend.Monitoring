import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './totalWorkers.module.scss';
import clsx from "clsx";

export function TotalWorkers({
  className,
  value
} : {
  className?: string;
  value?: number
}) {
  return (
    <UiBorderBox className={clsx(
      className,
      styles['wrapper']
    )}>
      <UiBgContainer className={styles['container']} color="opaque">
        <span>Total Workers</span>
        <span>{value}</span>
      </UiBgContainer>
    </UiBorderBox>
  )
}