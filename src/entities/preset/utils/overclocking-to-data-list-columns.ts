import { OverclockingCpuType, OverclockingGpuType, OverclockingType } from "../model/overclocking.type";

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

  const gpuOverclocking = overclocking as OverclockingGpuType
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
    ]
  ];

}