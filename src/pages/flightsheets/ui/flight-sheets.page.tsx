import { UiSearch } from '@/shared/ui/ui-search'
import { FlightSheetsList } from './flight-sheets-list'
import styles from './flightSheets.page.module.scss'
import { UiSelect } from '@/shared/ui/ui-select'
import { CreateFlightSheetButton } from '@/features/flightsheet/create'

export function FlightSheetsPage() {
  return (
    <div className={styles['flightsheet-page']}>
      <div className={styles['header']}>
        <UiSelect className={styles['select']}/>
        <CreateFlightSheetButton className={styles['create-button']}/>
        <UiSearch className={styles['search']}/>
      </div>
      <FlightSheetsList />
    </div>
  )
}