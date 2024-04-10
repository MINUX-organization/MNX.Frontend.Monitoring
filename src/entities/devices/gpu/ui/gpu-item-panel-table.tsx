import clsx from "clsx";
import styles from './styles/gpuItemTable.module.scss';
import { UiTextTitleWrapper } from "@/shared/ui/ui-text-title-wrapper";
import { DeviceGpu } from "../model/types";

export function GpuItemPanelTable({
  className,
  deviceGpu
} : {
  className?: string;
  deviceGpu: DeviceGpu;
}) {
  return (
    <div className={clsx(
        className, 
        styles['gpu-panel-table']
      )}
    >
      <div className={styles['gpu-panel-table-item']}>
        <UiTextTitleWrapper text="MEM" />
        <span>
          {deviceGpu.memTemperature}&nbsp;
          <span>°C</span>
        </span>
      </div>
      <div className={styles['gpu-panel-table-item']}>
        <UiTextTitleWrapper text="TEMP" />
        <span>
          <span className={clsx(
            deviceGpu?.coreTemperature && deviceGpu.coreTemperature > 80 && styles['red']
          )}>
            {deviceGpu.coreTemperature}
          </span>&nbsp;
          <span>°C</span>
        </span>
      </div>
      <div className={styles['gpu-panel-table-item']}>
        <UiTextTitleWrapper text="FAN" />
        <span>
          {deviceGpu.fanSpeed}&nbsp;
          <span>%</span>
        </span>
      </div>
      <div className={styles['gpu-panel-table-item']}>
        <UiTextTitleWrapper text="PWR" />
        <span>
          {deviceGpu.power}&nbsp;
          <span className={styles['blue']}>W</span>
        </span>
      </div>
    </div>
  )
}