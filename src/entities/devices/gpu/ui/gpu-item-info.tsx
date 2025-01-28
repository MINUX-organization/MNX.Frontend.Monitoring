import clsx from "clsx"
import styles from './styles/gpuItemInfo.module.scss'
import { DeviceGpu } from "../model/types"
import { UiBorderBox } from "@/shared/ui/ui-border-box"
import { UiBgContainer } from "@/shared/ui/ui-bg-container"
import { UiColumnBoard } from "@/shared/ui/ui-column-board"
import { GpuMinerTable } from "./gpu-miner-table"

export function GpuItemInfo({
  className,
  deviceGpu
} : {
  className?: string
  deviceGpu: DeviceGpu
}) {
  const firstColumn = [
    // { label: "Core", value: `${deviceGpu} ${deviceGpu.coreClock.measureUnit}` },
    // { label: "Memory", value: `${deviceGpu.memoryClock.value} ${deviceGpu.memoryClock.measureUnit}` },
    { label: "Critical Temp.", value: `${deviceGpu.avarageTemperature} °C` },
    { label: "Power Limit", value: `${deviceGpu.power} Watt` },
  ]

  const secondColumn = [
    { label: "Manufacturer", value: deviceGpu.information.manufacturer },
    { label: "Driver", value: deviceGpu.driverVersion },
    { label: deviceGpu.information.technology.type, value: deviceGpu.information.technology.version },
    { label: "Vendor", value: deviceGpu.information.vendor},
  ]

  // const thirdColumn = [
  //   { label: "Memory Size", value: `${deviceGpu.memorySize.value} ${deviceGpu.memorySize.measureUnit}` },
  //   { label: "Memory", value: `${deviceGpu.memoryClock.value} ${deviceGpu.memoryClock.measureUnit}` },
  //   { label: "Critical Temp.", value: `${deviceGpu.criticalTemperature} °C` },
  //   { label: "Power Limit", value: `${deviceGpu.powerLimit} Watt` },
  // ]

  return (
    <UiBorderBox className={clsx(
      className,
      styles['gpu-item-info']
    )}>
      <UiBgContainer className={styles['gpu-item-flex']} color="opaque">
        <UiColumnBoard data={firstColumn} />
        <UiColumnBoard data={secondColumn} />
        {/* <UiColumnBoard data={thirdColumn} /> */}
        <div className={styles['gpu-info']}>
          <div className={styles['item']}>
            <span className={styles['label']}>MINER</span>
            <span>{deviceGpu.minerName}</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['label']}>FLIGHT SHEET</span>
            <span>{deviceGpu.flightSheetName}</span>
          </div>
        </div>
        <GpuMinerTable/>
      </UiBgContainer>
    </UiBorderBox>
  )
}