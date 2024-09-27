import { SliderProps } from "../ui/ui-slider";

export type SliderParameter = {
  clocking: Data[];
  voltage: Data[];
  other: Data[];
}

export type Data = {
  label: string;
} & SliderProps;