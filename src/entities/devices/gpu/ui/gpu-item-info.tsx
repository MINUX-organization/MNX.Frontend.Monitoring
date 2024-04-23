import clsx from "clsx"
import styles from './styles/gpuItemInfo.module.scss'
import { DeviceGpu } from "../model/types"

export function GpuItemInfo({
  className
} : {
  className?: string
  deviceGpu?: DeviceGpu
}) {
  return (
    <div className={clsx(
      className,
      styles['gpu-item-info']
    )}>
      fffff
    </div>
  )
}