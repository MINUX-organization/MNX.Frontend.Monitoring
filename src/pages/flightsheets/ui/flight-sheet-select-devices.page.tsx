import styles from './flightSheetSelectDevices.page.module.scss'
import { UiButton } from '@/shared/ui/ui-button'
import { ArrowLeft } from 'lucide-react'
import { UiBorderBox } from '@/shared/ui/ui-border-box'
import { UiBgContainer } from '@/shared/ui/ui-bg-container'
import { useNavigate, useParams } from 'react-router'
import { useFlightSheetByIdQuery, useRigDevicesQuery } from '@/entities/flightsheet'
import { match } from 'ts-pattern'
import { UiSpinner } from '@/shared/ui/ui-spinner'
import { ROUTER_PATHS } from '@/shared/constants/routes'
import { FlightSheetSelectorDevices } from '@/widgets/flight-sheet-select-devices'

export function FlightSheetSelectDevicesPage() {
  const { flightSheetId } = useParams(); 
  const { flightSheet, isLoading } = useFlightSheetByIdQuery(flightSheetId);
  const { rigDevices } = useRigDevicesQuery(flightSheet?.id);

  const navigation = useNavigate()

  return (
    <div className={styles['flight-sheet-select-devices-page']}>
      <div className={styles['header']}>
        <UiButton 
          className={styles['back-button']} 
          color="blue" 
          withBorder 
          onClick={() => navigation(`/${ROUTER_PATHS.FLIGHT_SHEETS}`)}
        >
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <ArrowLeft size={20}/>
            <span>BACK</span>
          </div>
        </UiButton>
      </div>
      <UiBorderBox className={styles['content']}>
        <UiBgContainer color='opaque' className={styles['content-container']}>
          <div className={styles['content-container-header']}>
            <span className={styles['title']}>Select devices</span>
            <span className={styles['subtitle']}>for Flight sheet:&nbsp;
              {match(isLoading)
              .with(true, () => <UiSpinner size={20} className={styles['spinner']}/>)
              .otherwise(() => <span className={styles['flight-sheet-name']}>{flightSheet?.name}</span>)}
            </span>
          </div>
          <FlightSheetSelectorDevices rigDevices={rigDevices} flightSheet={flightSheet}/>
        </UiBgContainer>
      </UiBorderBox>
    </div>
  )
}