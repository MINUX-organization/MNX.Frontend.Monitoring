import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './totalWorkers.module.scss';
import clsx from "clsx";

export function TotalPower({
  className,
  value
} : {
  className?: string;
  value?: {value: number, measurement: string};
}) {
  return (
    <UiBorderBox className={clsx(
      className,
      styles['wrapper']
    )}>
      <UiBgContainer className={styles['container']} color="opaque">
        <span>Total Power</span>
        <span>{value?.value} {value?.measurement}</span>
      </UiBgContainer>
    </UiBorderBox>
  )
}