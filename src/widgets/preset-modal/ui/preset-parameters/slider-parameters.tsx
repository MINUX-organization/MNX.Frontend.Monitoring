import { UiTitle } from "@/shared/ui/ui-title";
import styles from './sliderParameters.module.scss';
import { SliderProps, UiSlider } from "@/shared/ui/ui-slider";
import clsx from "clsx";
import _ from "lodash";

type Data = {
  label: string;
} & SliderProps;

export function SliderParameters({
  className,
  label,
  data,
} : {
  className?: string;
  label?: string;
  data?: Data[];
}) {
  return (
    <div className={clsx(className, styles['slider-parameters'])}>
      <UiTitle label={label} />
      <div className={styles['parameters']}>
        {_.map(data, (item) => (
          <UiSlider key={item.label} {...item} />
        ))}
      </div>
    </div>
  )
}