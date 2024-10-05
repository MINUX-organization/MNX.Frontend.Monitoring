import { Overclocking, PostPresetOverclocking } from "@/entities/preset";
import { SliderParameter } from "@/shared/types/slider-types";
import _ from "lodash";

export function toPreset(name: string, gpuName: string, presetSlider: SliderParameter): PostPresetOverclocking {
  const overclocking: unknown = _.reduce(presetSlider, (acc: { [key: string]: number }, values) => {
    _.forEach(values, (value) => {
        acc[_.camelCase(value.label)] = value.value ?? value.default;
    });
    return acc;
  }, {});

  return {
    name,
    gpuName,
    overclocking: overclocking as Overclocking
  }
}