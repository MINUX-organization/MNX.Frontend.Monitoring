import clsx from "clsx";
import styles from './cpuItemPanelTable.module.scss';
// import { UiTextTitleWrapper } from "@/shared/ui/ui-text-title-wrapper";
import { DeviceCpu } from "../model/types";

export function СpuItemPanelTable({
  className,
  // deviceCpu
} : {
  className?: string;
  deviceCpu: DeviceCpu;
}) {
  return (
    <div className={clsx(
        className, 
        styles['cpu-panel-table']
      )}
    >
      {/* <div className={styles['cpu-panel-table-item']}>
        <UiTextTitleWrapper className={styles['text']} text="CLK" />
        <span>
          {deviceCpu.}&nbsp;
          <span>MHz</span>
        </span>
      </div>
      <div className={styles['cpu-panel-table-item']}>
        <UiTextTitleWrapper className={styles['text']} text="TEMP" />
        <span>
          <span className={clsx(
            deviceCpu?.temperature && deviceCpu.temperature > 80 && styles['red']
          )}>
            {deviceCpu.temperature}
          </span>&nbsp;
          <span>°C</span>
        </span>
      </div>
      <div className={styles['cpu-panel-table-item']}>
        <UiTextTitleWrapper className={styles['text']}  text="FAN" />
        <span>
          {deviceCpu.fan}&nbsp;
          <span>%</span>
        </span>
      </div>
      <div className={styles['cpu-panel-table-item']}>
        <UiTextTitleWrapper className={styles['text']} text="PWR" />
        <span>
          {deviceCpu.power}&nbsp;
          <span className={styles['blue']}>W</span>
        </span>
      </div> */}
    </div>
  )
}