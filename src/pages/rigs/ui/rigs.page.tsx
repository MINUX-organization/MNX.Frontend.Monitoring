import { UiSelect } from '@/shared/ui/ui-select';
import styles from './rigs.page.module.scss';

export function Rigs() {
  const options = [
    'ID',
    'Name',
    'Watt',
  ]

  return (
    <div className={styles['rigs-page']}>
      <UiSelect 
        options={options} 
        getOptionLabel={(option) => option} 
        placeholder='Sort by' 
        selectedOnChange={(selected) => console.log(selected)}
      />
      
    </div>
  )
}