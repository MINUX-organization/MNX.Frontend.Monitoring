import { UiTitle } from "@/shared/ui/ui-title";
import styles from './sliderParameters.module.scss';
import { UiSlider } from "@/shared/ui/ui-slider";
import clsx from "clsx";
import _ from "lodash";
import { Data } from "@/shared/types/slider-types";

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
          <div key={item.label} className={styles['parameter']}>
            <span className={styles['label']}>{item.label}</span>
            <UiSlider {...item} />
            <div className={styles['box']}>
              <div className={styles['value']}>
                <span className={styles['value-text']}>
                  {item.value && item.value > 0 ? '+' : ''}
                  {item.value}
                </span>
              </div>
              <span className={styles['unit']}>{item.measureUnit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}