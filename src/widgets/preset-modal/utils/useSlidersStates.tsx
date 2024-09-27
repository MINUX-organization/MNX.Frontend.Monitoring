import { GpuRestrictions } from "@/entities/devices/gpu"
import { Preset } from "@/entities/preset"
import _ from "lodash"
import { useSliderParameters } from "./useSliderParameters"
import { SliderParameter } from "@/shared/types/slider-types";

export function useSliderStates(gpuRestriction: GpuRestrictions, preset: Preset): SliderParameter {
  const coreClockLockParameters = useSliderParameters({
    label: 'Core Clock Lock',
    min: gpuRestriction.clock.core.lock.minimal,
    max: gpuRestriction.clock.core.lock.maximal,
    value: preset.overclocking.coreClockLock,
    measureUnit: 'Mhz'
  });

  const memoryClockLockParameters = useSliderParameters({
    label: 'Memory Clock Lock',
    min: gpuRestriction.clock.memory.lock.minimal,
    max: gpuRestriction.clock.memory.lock.maximal,
    value: preset.overclocking.memoryClockLock,
    measureUnit: 'Mhz'
  });

  const coreVoltageLockParameters = useSliderParameters({
    label: 'Core Voltage Lock',
    min: gpuRestriction.voltage.core.lock.minimal,
    max: gpuRestriction.voltage.core.lock.maximal,
    value: preset.overclocking.coreVoltage,
    measureUnit: 'mV'
  });

  const memoryVoltageLockParameters = useSliderParameters({
    label: 'Memory Voltage Lock',
    min: gpuRestriction.voltage.memory.lock.minimal,
    max: gpuRestriction.voltage.memory.lock.maximal,
    value: preset.overclocking.memoryVoltage,
    measureUnit: 'mV'
  });

  const coreVoltageOffsetParameters = useSliderParameters({
    label: 'Core Voltage Offset',
    min: gpuRestriction.voltage.core.offset.minimal,
    max: gpuRestriction.voltage.core.offset.maximal,
    value: preset.overclocking.coreVoltageOffset,
    measureUnit: 'mV'
  });

  const memoryVoltageOffsetParameters = useSliderParameters({
    label: 'Memory Voltage Offset',
    min: gpuRestriction.voltage.memory.offset.minimal,
    max: gpuRestriction.voltage.memory.offset.maximal,
    value: preset.overclocking.memoryVoltageOffset,
    measureUnit: 'mV'
  });

  const coreClockOffsetParameters = useSliderParameters({
    label: 'Core Clock Offset',
    min: gpuRestriction.clock.core.offset.minimal,
    max: gpuRestriction.clock.core.offset.maximal,
    value: preset.overclocking.coreClockOffset,
    measureUnit: 'Mhz'
  });

  const memoryClockOffsetParameters = useSliderParameters({
    label: 'Memory Clock Offset',
    min: gpuRestriction.clock.memory.offset.minimal,
    max: gpuRestriction.clock.memory.offset.maximal,
    value: preset.overclocking.memoryClockOffset,
    measureUnit: 'Mhz'
  });

  const fanSpeedParameters = useSliderParameters({
    label: 'Fan Speed',
    min: gpuRestriction.fanSpeed.minimal,
    max: gpuRestriction.fanSpeed.maximal,
    value: preset.overclocking.fanSpeed,
    measureUnit: '%'
  }); 

  const powerLimitParameters = useSliderParameters({
    label: 'Power Limit',
    min: gpuRestriction.power.minimal,
    max: gpuRestriction.power.maximal,
    value: preset.overclocking.powerLimit,
    measureUnit: 'Watt'
  })

  return {
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