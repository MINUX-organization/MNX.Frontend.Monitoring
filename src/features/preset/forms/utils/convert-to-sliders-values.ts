import { OverclockingGpuType } from "@/entities/preset";
import { SliderType } from "../model/slider.type";
import { GpuRestrictionsType, RestrictionsType } from "@/entities/devices";

function convertToRestrictions(restrictions: RestrictionsType, value?: number) {
  return {
    min: restrictions.minimal,
    max: restrictions.maximal,
    value,
    isWritable: restrictions.isWritable,
    default: restrictions.default
  }
}

export function convertToSliders(restrictions: GpuRestrictionsType, overcocking?: OverclockingGpuType): SliderType[] {
  return [
  {
    label: 'Clocking',
    values: [
      { label: 'Core Clock Lock', unit: 'MHz', ...convertToRestrictions(restrictions.clock.core.lock, overcocking?.coreClockLock) },
      { label: 'Core Clock Offset', unit: 'MHz', ...convertToRestrictions(restrictions.clock.core.offset, overcocking?.coreClockOffset) },
      { label: 'Memory Clock Lock', unit: 'MHz', ...convertToRestrictions(restrictions.clock.memory.lock, overcocking?.memoryClockLock) },
      { label: 'Memory Clock Offset', unit: 'MHz', ...convertToRestrictions(restrictions.clock.memory.offset, overcocking?.memoryClockOffset) },
    ]
  },
  {
    label: 'Voltage',
    values: [
      { label: 'Core Voltage', unit: 'mV', ...convertToRestrictions(restrictions.voltage.core.lock, overcocking?.coreVoltage) },
      { label: 'Core Voltage Offset', unit: 'mV', ...convertToRestrictions(restrictions.voltage.core.offset, overcocking?.coreVoltageOffset) },
      { label: 'Memory Voltage', unit: 'mV', ...convertToRestrictions(restrictions.voltage.memory.lock, overcocking?.memoryVoltage) },
      { label: 'Memory Voltage Offset', unit: 'mV', ...convertToRestrictions(restrictions.voltage.memory.offset, overcocking?.memoryVoltageOffset) },
    ]
  },
  {
    label: 'Other',
    values: [
      { label: 'Fan Speed', unit: '%', ...convertToRestrictions(restrictions.fanSpeed, overcocking?.fanSpeed) },
      { label: 'Power Limit', unit: 'W', ...convertToRestrictions(restrictions.power, overcocking?.powerLimit) },
    ]
  }]
}