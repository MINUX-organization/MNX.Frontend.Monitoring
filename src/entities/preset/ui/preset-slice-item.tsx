import { UiColumnBoard } from "@/shared/ui/ui-column-board";
import { Preset } from "../model/types";
import clsx from "clsx";
import styles from './presetSliceItem.module.scss';

export function PresetSliceItem({
  className,
  preset,
  renderApply,
  renderEdit,
  renderDelete,
} : {
  className?: string;
  preset: Preset;
  renderApply?: (presetId: string) => React.ReactNode;
  renderEdit?: (presetId: string) => React.ReactNode;
  renderDelete?: (presetId: string) => React.ReactNode;
}) {
  const measureUnit = "Mhz";
  const isFeatures: boolean = renderApply != undefined|| renderEdit != undefined || renderDelete != undefined;
  
  const firstField = [
    {label: 'Memory Clock Lock', value: preset.overclocking.memoryClockLock, measureUnit: measureUnit},
    {label: 'Memory Clock Offset', value: preset.overclocking.memoryClockOffset, measureUnit: measureUnit},
    {label: 'Memory Voltage', value: preset.overclocking.memoryVoltage, measureUnit: measureUnit},
    {label: 'Memory Voltage Offset', value: preset.overclocking.memoryVoltageOffset, measureUnit: measureUnit},
  ]

  const secondField = [
    {label: 'Core Clock Lock', value: preset.overclocking.coreClockLock, measureUnit: measureUnit},
    {label: 'Core Clock Offset', value: preset.overclocking.coreClockOffset, measureUnit: measureUnit},
    {label: 'Core Voltage', value: preset.overclocking.coreVoltage, measureUnit: measureUnit},
    {label: 'Core Voltage Offset', value: preset.overclocking.coreVoltageOffset, measureUnit: measureUnit},
  ]

  const thirdField = [
    {label: 'Power Limit', value: preset.overclocking.powerLimit, measureUnit: measureUnit},
    {label: 'Fan Speed', value: preset.overclocking.fanSpeed, measureUnit: '%'},
  ]

  return (
    <div className={clsx(className, styles["preset-slice-item"])}>
      <span className={styles["name"]}>{preset.name}</span>
      <UiColumnBoard data={firstField} />
      <UiColumnBoard data={secondField} />
      <UiColumnBoard data={thirdField} />
      {isFeatures && (
        <div className={styles["features"]}>
          {renderApply?.(preset.id)}
          {renderEdit?.(preset.id)}
          {renderDelete?.(preset.id)}
        </div>
      )}
    </div>
  )
}