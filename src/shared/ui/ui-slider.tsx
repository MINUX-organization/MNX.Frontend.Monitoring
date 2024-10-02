import clsx from "clsx";
import ReactSlider from "react-slider";
import styles from './styles/uiSlider.module.scss'

export type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  measureUnit: string
}

export function UiSlider({
  className,
  value,
  onChange,
  min,
  max,
} : {
  className?: string;
} & Partial<SliderProps> ) {
  return (
    <div className={clsx(className, styles['ui-slider'])}>
      <div className={styles['values']}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <ReactSlider
        className={styles['slider']}
        thumbClassName={styles['thumb']}
        renderTrack={({key, ...props}, state) => (
          <div
            key={key}
            {...props}
            className={clsx(styles['track'], {
              [styles['track-0']]: state.index === 0,
              [styles['track-1']]: state.index === 1
            })}
          />
        )}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}