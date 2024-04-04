import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { DeviceGpu } from "../model/types";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import styles from './gpuItem.module.scss';
import clsx from "clsx";
import { UiActiveState } from "@/shared/ui/ui-active-state";

export function GpuItem({
  className,
  deviceGpu
} : {
  className?: string;
  deviceGpu: DeviceGpu;
}) {
  return (
    <div className={clsx(
      className,
      styles['gpu-item-wrapper']
    )}>
      <UiBorderBox className={styles['gpu-item']}>
        <UiBgContainer className={styles['gpu-item-container']} color="opaque">
          {deviceGpu?.isActive && <UiActiveState isActive={deviceGpu.isActive} />}
          <div className={styles['gpu-item-id']}>
            <span>
              <span className={styles['blue']}>ID</span>&nbsp;
              {deviceGpu.id}
            </span>
            <span>
              <span className={styles['blue']}>BUS</span>
              {deviceGpu.bus}
            </span>
          </div>
          <div className={styles['gpu-item-name']}>
            <span className={styles['device-name']}>{deviceGpu.name}</span>
            <span className={styles['blue']}>{deviceGpu.rigName}</span>
          </div>
        </UiBgContainer>
      </UiBorderBox>

    </div>
  )
}