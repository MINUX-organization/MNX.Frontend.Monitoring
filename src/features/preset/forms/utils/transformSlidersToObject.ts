import _ from 'lodash';
import { SliderType } from '../model/slider.type';
import { OverclockingGpuType } from '@/entities/preset';

export function transformSlidersToObject(sliderType: SliderType[]): Omit<OverclockingGpuType, '$type'> {
  const result: Omit<OverclockingGpuType, '$type'> = {
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

  const validKeys = new Set(Object.keys(result));

  sliderType.forEach((group) => {
    group.values.forEach((slider) => {
      const key = _.camelCase(slider.label) as keyof Omit<OverclockingGpuType, '$type'>;
      
      if (validKeys.has(key)) {
        result[key] = slider.value ?? slider.default;
      }
    });
  });

  return result;
}