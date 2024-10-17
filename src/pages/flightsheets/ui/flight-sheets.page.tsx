import { UiSearch } from '@/shared/ui/ui-search'
import { FlightSheetsList } from './flight-sheets-list'
import { UiSelect } from '@/shared/ui/ui-select'
import { CreateFlightSheetButton } from '@/features/flightsheet/create'
import { Outlet } from 'react-router'
import styles from './flightSheets.page.module.scss'

export function FlightSheetsPage() {
  return (
    <div className={styles['flightsheet-page']}>
      <div className={styles['header']}>
        <UiSelect className={styles['select']}/>
        <CreateFlightSheetButton className={styles['create-button']}/>
        <UiSearch className={styles['search']}/>
      </div>
      <FlightSheetsList />
      <Outlet />
    </div>
  )
}