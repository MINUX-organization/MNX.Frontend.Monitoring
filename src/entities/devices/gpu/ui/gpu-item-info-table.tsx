import clsx from "clsx";
import styles from './styles/gpuItemInfoTable.module.scss';
import _ from "lodash";
import { UiTextTitleWrapper } from "@/shared/ui/ui-text-title-wrapper";
import { DeviceGpu } from "../model/types";

type GpuItemInfoTableProps = {
  className: string;
  deviceGpu: DeviceGpu;
}

export function GpuItemInfoTable({
  className,
  deviceGpu
} : GpuItemInfoTableProps) {
  return (
    <div className={clsx(
        className, 
        styles['gpu-info-table']
      )}
    >
      <div className={styles['gpu-info-table-item']}>
        <UiTextTitleWrapper text="TEMP" />
        <span>
          <span className={clsx(
            deviceGpu?.temperature && deviceGpu.temperature > 80 && styles['red']
          )}>
            {deviceGpu.temperature}
          </span>&nbsp;
          <span>°C</span>
        </span>
      </div>
      <div className={styles['gpu-info-table-item']}>
        <UiTextTitleWrapper text="FAN" />
        <span>
          {deviceGpu.fanSpeed}&nbsp;
          <span>%</span>
        </span>
      </div>
      <div className={styles['gpu-info-table-item']}>
        <UiTextTitleWrapper text="PWR" />
        <span>
          {deviceGpu.power?.value}&nbsp;
          <span className={styles['blue']}>{deviceGpu.power?.measureUnit}</span>
        </span>
      </div>
    </div>
  )
}