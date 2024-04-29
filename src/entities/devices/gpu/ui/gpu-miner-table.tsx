import { UiBorderBox } from "@/shared/ui/ui-border-box";
import clsx from "clsx";
import styles from "./styles/gpuMinerTable.module.scss";

export function GpuMinerTable({
  className
} : {
  className?: string;
}) {
  return (
    <UiBorderBox className={clsx(className, styles['gpu-miner-table-container'])}>
      <div className={styles['gpu-miner-table']}>
        <span>Miner</span>
        <span className={styles['card-id']}>Card ID</span>
      </div>
      {/* TODO */}
    </UiBorderBox>
  )
}