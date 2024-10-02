import { UiColumnBoard } from "@/shared/ui/ui-column-board";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { Preset } from "../model/types";
import styles from './presetItem.module.scss';
import React from "react";

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
  const measureUnit = "Mhz";

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
    {label: 'Power Limit', value: preset.overclocking.powerLimit, measureUnit: 'W'},
    {label: 'Fan Speed', value: preset.overclocking.fanSpeed, measureUnit: "%"},
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
        <div className={styles["preset-board"]}>
          <UiColumnBoard data={firstField} />
          <UiColumnBoard data={secondField} />
          <UiColumnBoard data={thirdField} />
        </div>
      </UiBgContainer>
    </UiBorderBox>
  )
}