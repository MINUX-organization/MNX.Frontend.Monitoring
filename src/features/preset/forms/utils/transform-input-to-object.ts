import camelCase from 'lodash/camelCase';
import { InputType } from '../model/input.type';
import { OverclockingType } from '@/entities/preset';
import { AmdOverclockingGpuType, NvidiaOverclockingGpuType } from '@/entities/preset/model/overclocking.type';

const transformToInput = <T>(inputType: InputType[], value: T): Omit<OverclockingType, '$type'> => {
  const validKeys = new Set(Object.keys(value as object));

  inputType.forEach((group) => {
    group.values.forEach((slider) => {
      const key = camelCase(slider.label) as keyof T;
      
      if (validKeys.has(key as string)) {
        value[key] = (slider.value ?? slider.default) as T[keyof T];
      }
    });
  });

  return value as Omit<OverclockingType, '$type'>;
}

export function transformInputToObject(
  InputType: InputType[], 
  $type?: "CPU" | "AmdGPU" | "NvidiaGPU" | "IntelGPU"
) : Omit<OverclockingType, '$type'> | undefined {
  if ($type === 'NvidiaGPU') {
    const result: Omit<NvidiaOverclockingGpuType, '$type'> = {
      fanSpeed: 0,
      powerLimit: 0,
      coreClockLock: 0,
      coreClockOffset: 0,
      memoryClockLock: 0,
      memoryClockOffset: 0,
      coreVoltage: 0,
      coreVoltageOffset: 0,
      memoryVoltage: 0,
      memoryVoltageOffset: 0,
    };

    return transformToInput(InputType, result);
  }

  if ($type === 'AmdGPU') {
    const result: Omit<AmdOverclockingGpuType, '$type'> = {
      powerLimit: 0,
      fanSpeed: 0,
      coreClockLock: 0,
      coreClockState: 0,
      memoryClockLock: 0,
      memoryClockState: 0,
      coreVoltage: 0,
      coreVoltageOffset: 0,
      memoryVoltage: 0,
      memoryControllerVoltage: 0,
      memoryTweak: '',
      enhancedOverclock: false,
      alternativeDownVoltage: false,
      socFrequency: 0,
      socVoltage: 0,
    };

    return transformToInput(InputType, result);
  }

  return undefined
}