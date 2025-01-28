import { GpuRestrictions } from "@/entities/devices/gpu"
import { Overclocking } from "@/entities/preset"
import { useSliderParameters } from "./useSliderParameters"
import { SliderParameter } from "@/shared/types/slider-types";
import { useStateObject } from "@/shared/lib/utils/state-object";

export function useSliderStates(gpuRestriction: GpuRestrictions, overclocking?: Overclocking, presetId?: string): 
SliderParameter & { reset: () => void } {
  const forceReset = useStateObject(false);
  
  const reset = () => forceReset.setValue((prev) => !prev);
  
  const coreClockLockParameters = useSliderParameters({
    presetId: presetId,
    label: 'Core Clock Lock',
    min: gpuRestriction.clock.core.lock.minimal,
    max: gpuRestriction.clock.core.lock.maximal,
    value: overclocking?.coreClockLock,
    measureUnit: 'Mhz',
    forceReset: forceReset.value,
    default: gpuRestriction.clock.core.lock.default
  });

  const memoryClockLockParameters = useSliderParameters({
    presetId: presetId,
    label: 'Memory Clock Lock',
    min: gpuRestriction.clock.memory.lock.minimal,
    max: gpuRestriction.clock.memory.lock.maximal,
    value: overclocking?.memoryClockLock,
    measureUnit: 'Mhz',
    forceReset: forceReset.value,
    default: gpuRestriction.clock.memory.lock.default
  });

  const coreVoltageLockParameters = useSliderParameters({
    presetId: presetId,
    label: 'Core Voltage',
    min: gpuRestriction.voltage.core.lock.minimal,
    max: gpuRestriction.voltage.core.lock.maximal,
    value: overclocking?.coreVoltage,
    measureUnit: 'mV',
    forceReset: forceReset.value,
    default: gpuRestriction.voltage.core.lock.default
  });

  const memoryVoltageLockParameters = useSliderParameters({
    presetId: presetId,
    label: 'Memory Voltage',
    min: gpuRestriction.voltage.memory.lock.minimal,
    max: gpuRestriction.voltage.memory.lock.maximal,
    value: overclocking?.memoryVoltage,
    measureUnit: 'mV',
    forceReset: forceReset.value,
    default: gpuRestriction.voltage.memory.lock.default
  });

  const coreVoltageOffsetParameters = useSliderParameters({
    presetId: presetId,
    label: 'Core Voltage Offset',
    min: gpuRestriction.voltage.core.offset.minimal,
    max: gpuRestriction.voltage.core.offset.maximal,
    value: overclocking?.coreVoltageOffset,
    measureUnit: 'mV',
    forceReset: forceReset.value,
    default: gpuRestriction.voltage.core.offset.default
  });

  const memoryVoltageOffsetParameters = useSliderParameters({
    presetId: presetId,
    label: 'Memory Voltage Offset',
    min: gpuRestriction.voltage.memory.offset.minimal,
    max: gpuRestriction.voltage.memory.offset.maximal,
    value: overclocking?.memoryVoltageOffset,
    measureUnit: 'mV',
    forceReset: forceReset.value,
    default: gpuRestriction.voltage.memory.offset.default
  });

  const coreClockOffsetParameters = useSliderParameters({
    presetId: presetId,
    label: 'Core Clock Offset',
    min: gpuRestriction.clock.core.offset.minimal,
    max: gpuRestriction.clock.core.offset.maximal,
    value: overclocking?.coreClockOffset,
    measureUnit: 'Mhz',
    forceReset: forceReset.value,
    default: gpuRestriction.clock.core.offset.default
  });

  const memoryClockOffsetParameters = useSliderParameters({
    presetId: presetId,
    label: 'Memory Clock Offset',
    min: gpuRestriction.clock.memory.offset.minimal,
    max: gpuRestriction.clock.memory.offset.maximal,
    value: overclocking?.memoryClockOffset,
    measureUnit: 'Mhz',
    forceReset: forceReset.value,
    default: gpuRestriction.clock.memory.offset.default
  });

  const fanSpeedParameters = useSliderParameters({
    presetId: presetId,
    label: 'Fan Speed',
    min: gpuRestriction.fanSpeed.minimal,
    max: gpuRestriction.fanSpeed.maximal,
    value: overclocking?.fanSpeed,
    measureUnit: '%',
    forceReset: forceReset.value,
    default: gpuRestriction.fanSpeed.default
  }); 

  const powerLimitParameters = useSliderParameters({
    presetId: presetId,
    label: 'Power Limit',
    min: gpuRestriction.power.minimal,
    max: gpuRestriction.power.maximal,
    value: overclocking?.powerLimit,
    measureUnit: 'Watt',
    forceReset: forceReset.value,
    default: gpuRestriction.power.default
  })

  return {
    reset,
    clocking: [
      coreClockLockParameters,
      memoryClockLockParameters,
      coreClockOffsetParameters,
      memoryClockOffsetParameters,
    ],
    voltage: [
      coreVoltageLockParameters,
      coreVoltageOffsetParameters,
      memoryVoltageLockParameters,
      memoryVoltageOffsetParameters,
    ],
    other: [
      fanSpeedParameters,
      powerLimitParameters,
    ]
  }
}