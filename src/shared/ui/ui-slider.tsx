import clsx from "clsx";
import ReactSlider from "react-slider";
import styles from './styles/uiSlider.module.scss'

export type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

export function UiSlider({
  className,
  value,
  onChange,
  min,
  max
} : {
  className?: string;
} & Partial<SliderProps> ) {

  return (
    <ReactSlider
      className={clsx(
        className,
        styles['slider']
      )}
      thumbClassName={styles['thumb']}
      trackClassName={styles['track']}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
  )
}