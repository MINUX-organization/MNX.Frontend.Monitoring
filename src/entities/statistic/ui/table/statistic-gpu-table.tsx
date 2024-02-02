import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { StatisticGpu } from "../../model/types";
import styles from './statisticGpuTable.module.scss';
import clsx from "clsx";

type StatisticGpuTableProps = {
  className?: string;
  value?: StatisticGpu;
}

export function StatisticGpuTable({
  className,
  value
} : StatisticGpuTableProps) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['wrapper']
    )}>
    </UiBorderBox>
  )
}