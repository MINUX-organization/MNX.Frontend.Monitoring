import { FlightSheetItem, useFlightSheetRepository } from "@/entities/flightsheet"
import styles from './flightSheetsList.module.scss'
import _ from "lodash";
import { match } from "ts-pattern";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { ApplyFlightSheetButton } from "@/features/flightsheet/apply";
import { EditFlightSheetButton } from "@/features/flightsheet/edit";
import { DeleteFlightSheetButton } from "@/features/flightsheet/delete";
import { OnOpen } from "@/features/flightsheet/on-open";

export function FlightSheetsList()  {
  const { flightSheetsList, isLoading } = useFlightSheetRepository();

  return (
    <div className={styles['flightsheet-list']}>
      {match(isLoading)
        .with(true, () => <UiSpinner />)
        .otherwise(() => _.map(flightSheetsList, (flightSheet) => (
          <FlightSheetItem 
            key={flightSheet.id}
            flightSheet={flightSheet}
            renderApply={(flightSheetId) => <ApplyFlightSheetButton flightSheetId={flightSheetId} />}
            renderEdit={(flightSheetId) => <EditFlightSheetButton flightSheetId={flightSheetId} />}
            renderDelete={(flightSheetId) => <DeleteFlightSheetButton flightSheetId={flightSheetId} />}
            renderOnOpen={(isOpen) => <OnOpen isOpen={isOpen} />}
          />
      )))}
    </div>
  )
}