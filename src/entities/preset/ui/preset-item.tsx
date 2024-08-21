import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { Preset } from "../model/types";
import styles from './presetItem.module.scss';
import React from "react";
import { UiColumnBoard } from "@/shared/ui/ui-column-board";

export function PresetItem({
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
  const firstField = [
    {label: 'Memory Clock Lock', value: preset.memoryClockLock.value, measureUnit: preset.memoryClockLock.measureUnit},
    {label: 'Memory Clock Offset', value: preset.memoryClockOffset.value, measureUnit: preset.memoryClockOffset.measureUnit},
    {label: 'Memory Voltage', value: preset.memoryVoltage.value, measureUnit: preset.memoryVoltage.measureUnit},
    {label: 'Memory Voltage Offset', value: preset.memoryVoltageOffset.value, measureUnit: preset.memoryVoltageOffset.measureUnit},
  ]

  const secondField = [
    {label: 'Core Clock Lock', value: preset.coreClockLock.value, measureUnit: preset.coreClockLock.measureUnit},
    {label: 'Core Clock Offset', value: preset.coreClockOffset.value, measureUnit: preset.coreClockOffset.measureUnit},
    {label: 'Core Voltage', value: preset.coreVoltage.value, measureUnit: preset.coreVoltage.measureUnit},
    {label: 'Core Voltage Offset', value: preset.coreVoltageOffset.value, measureUnit: preset.coreVoltageOffset.measureUnit},
  ]

  const thirdField = [
    {label: 'Power Limit', value: preset.powerLimit.value, measureUnit: preset.powerLimit.measureUnit},
    {label: 'Fan Speed', value: preset.fanSpeed},
    {label: 'Critical Temp', value: preset.criticalTemperature},
  ]

  return (
    <UiBorderBox className={className}>
      <UiBgContainer className={styles["preset-item"]} color="transparent">
        <div className={styles["preset-panel"]}>
          <span>
            {preset.id}
            <span className={styles["gpu-name"]}> -&nbsp;{preset.name}</span>
          </span>
          <div className={styles["preset-panel-buttons"]}>
            {renderApply?.(preset.id)}
            {renderEdit?.(preset.id)}
            {renderDelete?.(preset.id)}
          </div>
        </div>
        <span className={styles["blue"]}>{preset.memoryVendor}&nbsp;{preset.memoryType}</span>
        
        <div className={styles["preset-board"]}>
          <UiColumnBoard data={firstField} />
          <UiColumnBoard data={secondField} />
          <UiColumnBoard data={thirdField} />
        </div>
      </UiBgContainer>
    </UiBorderBox>
  )
}