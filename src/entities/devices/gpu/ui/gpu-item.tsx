import { StateObject, useStateObject } from "@/shared/lib/utils/state-object";
import { DeviceGpu } from "../model/types";
import styles from './styles/gpuItem.module.scss';
import clsx from "clsx"; 

export function GpuItem({
  className,
  deviceGpu,
  renderItemPanel,
  renderItemInfo
} : {
  className?: string;
  deviceGpu: DeviceGpu;
  renderItemPanel: (deviceGpu: DeviceGpu, isOpen: StateObject<boolean>) => React.ReactNode;
  renderItemInfo: (deviceGpu: DeviceGpu) => React.ReactNode;
}) {
  const isOpen = useStateObject(false);

  return (
    <div className={clsx(
      className,
      styles['gpu-item-wrapper']
    )}>
      {renderItemPanel(deviceGpu, isOpen)}
      {isOpen.value && renderItemInfo(deviceGpu)}
    </div>
  )
}