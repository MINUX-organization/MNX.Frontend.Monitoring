import clsx from "clsx";
import ReactSlider from "react-slider";
import styles from './styles/uiSlider.module.scss'

export type SliderProps = {
  value?: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  default: number
  measureUnit: string
}

export function UiSlider({
  className,
  value,
  onChange,
  min,
  max,
  default: defaultValue,
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
        renderThumb={({key, ...props}) => (
          <div
            key={key}
            {...props}
            className={styles['thumb']}
          >
            <div className={styles['thumb-value']}>{(value && value > 0 ? '+' : '') + `${value}`}</div>
          </div>
        )}
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
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  )
}