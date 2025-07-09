import { AmdOverclockingGpuType, NvidiaOverclockingGpuType, OverclockingCpuType, OverclockingType } from "../model/overclocking.type";

export function OverclockingToDataListColumns(overclocking: OverclockingType) {
  if (overclocking.$type === 'CPU') {
    const cpuOverclocking = overclocking as OverclockingCpuType
    return [
      [
        { label: 'Core Clock Lock', value: cpuOverclocking.coreClockLock, unit: 'MHz' },
        { label: 'Core Voltage', value: cpuOverclocking.coreVoltage, unit: 'mV' },
      ]
    ];
  }

  if (overclocking.$type === 'NvidiaGPU') {
    const gpuOverclocking = overclocking as NvidiaOverclockingGpuType
    return [
      [
        { label: 'Mem. Clock Lock', value: gpuOverclocking.memoryClockLock, unit: 'MHz' },
        { label: 'Mem. Clock Offset', value: gpuOverclocking.memoryClockOffset, unit: 'MHz' },
        { label: 'Mem. Voltage', value: gpuOverclocking.memoryVoltage, unit: 'mV' },
        { label: 'Mem. Voltage Offset', value: gpuOverclocking.memoryVoltageOffset, unit: 'mV' },
      ],
      [
        { label: 'Core Clock Lock', value: gpuOverclocking.coreClockLock, unit: 'MHz' },
        { label: 'Core Clock Offset', value: gpuOverclocking.coreClockOffset, unit: 'MHz' },
        { label: 'Core Voltage', value: gpuOverclocking.coreVoltage, unit: 'mV' },
        { label: 'Core Voltage Offset', value: gpuOverclocking.coreVoltageOffset, unit: 'mV' },
      ],
      [
        { label: 'Fan Speed', value: gpuOverclocking.fanSpeed, unit: '%' },
        { label: 'Power Limit', value: gpuOverclocking.powerLimit, unit: 'W' },
      ],
    ];
  }

  if (overclocking.$type === 'AmdGPU') {
    const gpuOverclocking = overclocking as AmdOverclockingGpuType
    return [
      [
        { label: 'Mem. Clock Lock', value: gpuOverclocking.memoryClockLock, unit: 'MHz' },
        { label: 'Mem. Clock State', value: gpuOverclocking.memoryClockState, unit: 'MHz' },
        { label: 'Mem. Voltage', value: gpuOverclocking.memoryVoltage, unit: 'mV' },
        { label: 'Mem. Controller Voltage', value: gpuOverclocking.memoryControllerVoltage, unit: 'mV' },
        { label: 'Mem. Tweak', value: gpuOverclocking.memoryTweak },
      ],
      [
        { label: 'Core Clock Lock', value: gpuOverclocking.coreClockLock, unit: 'MHz' },
        { label: 'Core Clock State', value: gpuOverclocking.coreClockState, unit: 'MHz' },
        { label: 'Core Voltage', value: gpuOverclocking.coreVoltage, unit: 'mV' },
        { label: 'Core Voltage Offset', value: gpuOverclocking.coreVoltageOffset, unit: 'mV' },
      ],
      [
        { label: 'Fan Speed', value: gpuOverclocking.fanSpeed, unit: '%' },
        { label: 'Power Limit', value: gpuOverclocking.powerLimit, unit: 'W' },
        { label: 'SOC Tweak', value: gpuOverclocking.socFrequency, unit: '%' },
        { label: 'SOC Voltage', value: gpuOverclocking.socVoltage, unit: '%' },
      ],
    ];
  }
}