import { RigDevice } from "@/entities/flightsheet";
import styles from "./deviceItem.module.scss";
import clsx from "clsx";
import { HTMLProps } from "react";
import { UiSwitch } from "@/shared/ui/ui-switch";
import { GpuSvg } from "@/shared/assets/images/gpu";
import { match } from "ts-pattern";
import { CpuSvg } from "@/shared/assets/images/cpu";

export function FlightSheetDeviceItem({
  className,
  rigDevice,
  checked,
  onClick,
  onSetChecked,
  ...props
} : {
  className?: string;
  rigDevice?: RigDevice;
  checked: boolean;
  onSetChecked?: (checked: boolean) => void;
} & HTMLProps<HTMLDivElement>) {
  return (
    <div className={clsx(className, styles['device-item'])} {...props} onClick={() => onSetChecked?.(checked)}>
      <div className={styles['header']}>
        <span className={styles['id']}>ID:&nbsp;{rigDevice?.id}</span>
        <div className={styles['name-switch']}>
          <span className={styles['name']}>{rigDevice?.model}</span>
          <UiSwitch className={styles['switch']} checked={checked} />
        </div>
      </div>
      <div className={styles['info']}>
        <span className={styles['pci-bus']}>
          <span className={styles['blue']}>BUS:</span>&nbsp;
          {rigDevice?.pciBus}
        </span>
        <span className={styles['blue']}>{rigDevice?.flightSheetName}</span>
        <span className={styles['blue']}>{rigDevice?.minerName}</span>
      </div>
      {match(rigDevice?.type)
        .with('GPU', () => (
          <GpuSvg 
            className={styles['gpu-icon']}
            color={
              match(rigDevice?.manufacturer.toLowerCase())
              .with('nvidia', () => 'green')
              .with('amd', () => 'red')
              .with('intel', () => 'blue')
              .otherwise(() => 'white')
            }
        />))
        .otherwise(() => (
          <CpuSvg 
            className={styles['gpu-icon']}
            color={
              match(rigDevice?.manufacturer.toLowerCase())
              .with('amd', () => 'red')
              .with('intel', () => 'blue')
              .otherwise(() => 'white')
            }
          />
        ))
      }
    </div>
  )
}