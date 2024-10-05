import { useStateObject } from "@/shared/lib/utils/state-object";
import { Data } from "@/shared/types/slider-types";
import { SliderProps } from "@/shared/ui/ui-slider";
import { useEffect } from "react";

export function useSliderParameters({ 
  value,
  min,
  max,
  label,
  measureUnit,
  default: defaultValue,
  presetId,
  forceReset,
} : Omit<SliderProps, 'onChange'> & { label: string, presetId?: string, forceReset?: boolean }): Data {
  const sliderValue = useStateObject<number | undefined>(value);

  useEffect(() => {
    sliderValue.setValue(value ?? defaultValue);
  }, [presetId, forceReset]);

  return {
    label,
    onChange: (value: number) => {
      sliderValue.setValue(value);
    },
    value: sliderValue.value,
    min,
    max,
    measureUnit,
    default: defaultValue
  }
}