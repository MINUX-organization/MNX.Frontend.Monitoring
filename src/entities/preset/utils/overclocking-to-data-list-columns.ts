import { OverclockingCpuType, OverclockingGpuType, OverclockingType } from "../model/overclocking.type";

export function OverclockingToDataListColumns(overclocking: OverclockingType) {
  if (overclocking.$type === 'CPU') {
    const cpuOverclocking = overclocking as OverclockingCpuType
    return [
      [
        { label: 'Core Clock Lock', value: cpuOverclocking.coreClockLock, unit: 'MHz' },
        { label: 'Core Voltage', value: cpuOverclocking.coreVoltage, unit: 'V' },
      ]
    ];
  }

  const gpuOverclocking = overclocking as OverclockingGpuType
  return [
    [
      { label: 'Mem. Clock Lock', value: gpuOverclocking.memoryClockLock, unit: 'MHz' },
      { label: 'Mem. Clock Offset', value: gpuOverclocking.memoryClockOffset, unit: 'MHz' },
      { label: 'Mem. Voltage', value: gpuOverclocking.memoryVoltage, unit: 'V' },
      { label: 'Mem. Voltage Offset', value: gpuOverclocking.memoryVoltageOffset, unit: 'V' },
    ],
    [
      { label: 'Core Clock Lock', value: gpuOverclocking.coreClockLock, unit: 'MHz' },
      { label: 'Core Clock Offset', value: gpuOverclocking.coreClockOffset, unit: 'MHz' },
      { label: 'Core Voltage', value: gpuOverclocking.coreVoltage, unit: 'V' },
      { label: 'Core Voltage Offset', value: gpuOverclocking.coreVoltageOffset, unit: 'V' },
    ],
    [
      { label: 'Fan Speed', value: gpuOverclocking.fanSpeed, unit: '%' },
      { label: 'Power Limit', value: gpuOverclocking.powerLimit, unit: 'W' },
    ]
  ];

}