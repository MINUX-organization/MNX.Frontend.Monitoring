import { UiSearch } from '@/shared/ui/ui-search'
import { FlightSheetsList } from './flight-sheetsList'
import styles from './flightSheets.page.module.scss'
import { UiSelect } from '@/shared/ui/ui-select'
import { useStateObject } from '@/shared/lib/utils/state-object'
import CreateFlightSheetButton from '@/features/flightsheet/create'

export function FlightSheetsPage() {
  let obj = useStateObject("");

  return (
    <div className={styles['flightsheet-page']}>
      <div className={styles['header']}>
        <UiSelect renderSelectedOption={(obj) => obj} getOptionLabel={(opt) => opt} selectedOnChange={obj.setValue} selectedOption={obj.value} options={["1111", "222"]} className={styles['select']}/>
        <CreateFlightSheetButton />
        <UiSearch className={styles['search']}/>
      </div>
      <FlightSheetsList />
    </div>
  )
}