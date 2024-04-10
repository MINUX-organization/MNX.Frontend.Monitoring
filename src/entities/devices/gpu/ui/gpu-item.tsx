import { DeviceGpu } from "../model/types";
import styles from './styles/gpuItem.module.scss';
import clsx from "clsx"; 

export function GpuItem({
  className,
  deviceGpu
} : {
  className?: string;
  deviceGpu: DeviceGpu;
  renderItemPanel: (deviceGpu: DeviceGpu) => React.ReactNode;
  renderItemInfo: (deviceGpu: DeviceGpu) => React.ReactNode;
}) {
  return (
    <div className={clsx(
      className,
      styles['gpu-item-wrapper']
    )}>


    </div>
  )
}