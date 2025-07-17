import { InputType } from "../model/input.type";
import { GpuRestrictionsType, RestrictionsType } from "@/entities/devices";
import { AmdOverclockingGpuType, DeviceType, NvidiaOverclockingGpuType, OverclockingType } from "@/entities/preset/model/overclocking.type";

function convertToRestrictions<T>(restrictions?: RestrictionsType, value?: T) {
  return {
    min: restrictions?.minimal,
    max: restrictions?.maximal,
    value,
    isWritable: restrictions?.isWritable ? restrictions.isWritable : true,
    default: restrictions?.default ?? 0
  }
}

export function convertToInput(type?: DeviceType, restrictions?: GpuRestrictionsType, overclocking?: OverclockingType): InputType[] {
  if (type == 'NvidiaGPU') {
    const overclock = overclocking as NvidiaOverclockingGpuType;

    return [
      {
        label: 'Clocking',
        values: [
          { label: 'Core Clock Lock', unit: 'MHz', inputType: 'number', ...convertToRestrictions(restrictions?.clockCoreLock, overclock?.coreClockLock) },
          { label: 'Core Clock Offset', unit: 'MHz', inputType: 'number', ...convertToRestrictions(restrictions?.clockCoreOffset, overclock?.coreClockOffset) },
          { label: 'Memory Clock Lock', unit: 'MHz', inputType: 'number', ...convertToRestrictions(restrictions?.clockMemoryLock, overclock?.memoryClockLock) },
          { label: 'Memory Clock Offset', unit: 'MHz', inputType: 'number', ...convertToRestrictions(restrictions?.clockMemoryOffset, overclock?.memoryClockOffset) },
        ]
      },
      {
        label: 'Voltage',
        values: [
          { label: 'Core Voltage', unit: 'mV', inputType: 'number', ...convertToRestrictions(restrictions?.voltageCoreLock, overclock?.coreVoltage) },
          { label: 'Core Voltage Offset', unit: 'mV', inputType: 'number', ...convertToRestrictions(restrictions?.voltageCoreOffset, overclock?.coreVoltageOffset) },
          { label: 'Memory Voltage', unit: 'mV', inputType: 'number', ...convertToRestrictions(restrictions?.voltageMemoryLock, overclock?.memoryVoltage) },
          { label: 'Memory Voltage Offset', unit: 'mV', inputType: 'number', ...convertToRestrictions(restrictions?.voltageMemoryOffset, overclock?.memoryVoltageOffset) },
        ]
      },
      {
        label: 'Other',
        values: [
          { label: 'Fan Speed', unit: '%', inputType: 'slider', ...convertToRestrictions(restrictions?.fanSpeed, overclock?.fanSpeed) },
          { label: 'Power Limit', unit: 'W', inputType: 'slider', ...convertToRestrictions(restrictions?.power, overclock?.powerLimit) },
        ]
      }
    ];
  }

  if (type == 'AmdGPU') {
    const overclock = overclocking as AmdOverclockingGpuType;

    return [
      {
        label: 'Clocking',
        values: [
          { label: 'Core Clock Lock', unit: 'MHz', inputType: 'number', ...convertToRestrictions(restrictions?.clockCoreLock, overclock?.coreClockLock) },
          { label: 'Core Clock State', unit: 'MHz', inputType: 'number', ...convertToRestrictions(restrictions?.clockCoreOffset, overclock?.coreClockState) },
          { label: 'Memory Clock Lock', unit: 'MHz', inputType: 'number', ...convertToRestrictions(restrictions?.clockMemoryLock, overclock?.memoryClockLock) },
          { label: 'Memory Clock State', unit: 'MHz', inputType: 'number', ...convertToRestrictions(restrictions?.clockMemoryOffset, overclock?.memoryClockState) },
        ]
      },
      {
        label: 'Voltage',
        values: [
          { label: 'Core Voltage', unit: 'mV', inputType: 'number', ...convertToRestrictions(restrictions?.voltageCoreLock, overclock?.coreVoltage) },
          { label: 'Core Voltage Offset', unit: 'mV', inputType: 'number', ...convertToRestrictions(restrictions?.voltageCoreOffset, overclock?.coreVoltageOffset) },
          { label: 'Memory Voltage', unit: 'mV', inputType: 'number', ...convertToRestrictions(restrictions?.voltageMemoryLock, overclock?.memoryVoltage) },
          { label: 'Memory Controller Voltage', unit: 'mV', inputType: 'number', ...convertToRestrictions(restrictions?.voltageMemoryOffset, overclock?.memoryControllerVoltage) },
        ]
      },
      {
        label: 'Other',
        values: [
          { label: 'Fan Speed', unit: '%', inputType: 'slider', ...convertToRestrictions(restrictions?.fanSpeed, overclock?.fanSpeed) },
          { label: 'Power Limit', unit: 'W', inputType: 'slider', ...convertToRestrictions(restrictions?.power, overclock?.powerLimit) },
          { label: 'SOC Frequency', unit: 'MHz', inputType: 'number', ...convertToRestrictions(undefined, overclock?.socFrequency) },
          { label: 'SOC Voltage', unit: 'mV', inputType: 'number', ...convertToRestrictions(undefined, overclock?.socVoltage) },
          { label: 'Memory Tweak', inputType: 'text', ...convertToRestrictions(undefined, overclock?.memoryTweak ?? '') },
          { label: 'Alternative Down Voltage', inputType: 'checkbox', ...convertToRestrictions(undefined, overclock?.alternativeDownVoltage ?? false) },
          { label: 'Enhanced Overclock', inputType: 'checkbox', ...convertToRestrictions(undefined, overclock?.enhancedOverclock ?? false) },
        ]
      }
    ];
  }

  return [];
}