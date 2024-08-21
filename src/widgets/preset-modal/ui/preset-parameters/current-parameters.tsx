import { UiColumnBoard } from "@/shared/ui/ui-column-board";
import { UiTitle } from "@/shared/ui/ui-title";
import styles from './currentParameters.module.scss';

export function CurrentParameters() {
  const firstField = [
    {label: 'Core clock', value: undefined, measureUnit: undefined},
    {label: 'Core voltage', value: undefined, measureUnit: undefined},
    {label: 'Memory clock', value: undefined, measureUnit: undefined},
    {label: 'Memory voltage', value: undefined, measureUnit: undefined},
  ]

  const secondField = [
    {label: 'Fan speed', value: undefined, measureUnit: undefined},
    {label: 'Power usage', value: undefined, measureUnit: undefined},
    {label: 'Memory usage', value: undefined, measureUnit: undefined},
    {label: 'Temperature', value: undefined, measureUnit: undefined},
  ]

  return (
    <div className={styles['current-parameters']}>
      <UiTitle label='Current' />
      <div className={styles['parameters']}>
        <UiColumnBoard className={styles['column']} data={firstField} />
        <UiColumnBoard className={styles['column']} data={secondField} />
      </div>
    </div>
  )
}