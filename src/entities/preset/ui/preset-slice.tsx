import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { Preset } from "../model/types";
import clsx from "clsx";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import styles from './presetSlice.module.scss';

export function PresetSlice({
  className,
  preset,
  renderEdit,
  renderDelete,
} : {
  className?: string;
  preset: Preset;
  renderEdit?: (presetId: string) => React.ReactNode;
  renderDelete?: (presetId: string) => React.ReactNode;
}) {
  const firstField = [
    {label: 'Memory Clock Lock', value: preset.overclocking.memoryClockLock.value, measureUnit: preset.overclocking.memoryClockLock.measureUnit},
    {label: 'Memory Clock Offset', value: preset.overclocking.memoryClockOffset.value, measureUnit: preset.overclocking.memoryClockOffset.measureUnit},
    {label: 'Memory Voltage', value: preset.overclocking.memoryVoltage.value, measureUnit: preset.overclocking.memoryVoltage.measureUnit},
    {label: 'Memory Voltage Offset', value: preset.overclocking.memoryVoltageOffset.value, measureUnit: preset.overclocking.memoryVoltageOffset.measureUnit},
  ]

  const secondField = [
    {label: 'Core Clock Lock', value: preset.overclocking.coreClockLock.value, measureUnit: preset.overclocking.coreClockLock.measureUnit},
    {label: 'Core Clock Offset', value: preset.overclocking.coreClockOffset.value, measureUnit: preset.overclocking.coreClockOffset.measureUnit},
    {label: 'Core Voltage', value: preset.overclocking.coreVoltage.value, measureUnit: preset.overclocking.coreVoltage.measureUnit},
    {label: 'Core Voltage Offset', value: preset.overclocking.coreVoltageOffset.value, measureUnit: preset.overclocking.coreVoltageOffset.measureUnit},
  ]

  const thirdField = [
    {label: 'Power Limit', value: preset.overclocking.powerLimit.value, measureUnit: preset.overclocking.powerLimit.measureUnit},
    {label: 'Fan Speed', value: preset.overclocking.fanSpeed},
    {label: 'Critical Temp', value: preset.overclocking.criticalTemperature},
  ]

  return (
    <UiBorderBox withPadding className={clsx(className, styles['preset-slice'])}>
      <UiBgContainer color="opaque">
        
      </UiBgContainer>
    </UiBorderBox>
  );
}