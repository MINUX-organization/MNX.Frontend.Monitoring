import { useStateObject } from "@/shared/lib/utils/state-object";
import { Data } from "@/shared/types/slider-types";
import { SliderProps } from "@/shared/ui/ui-slider";
import { useEffect } from "react";

export function useSliderParameters({ 
  value,
  min,
  max,
  label,
  measureUnit
} : Omit<SliderProps, 'onChange'> & { label: string }): Data {
  const sliderValue = useStateObject<number>(value);

  useEffect(() => {
    sliderValue.setValue(value);
  }, [value]);

  return {
    label,
    onChange: (value: number) => {
      sliderValue.setValue(value);
    },
    value: sliderValue.value,
    min,
    max,
    measureUnit
  }
}