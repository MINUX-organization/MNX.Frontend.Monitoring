import { FlightSheetItem, flightSheetQueryOptions, FlightSheetType } from "@/entities/flight-sheet"
import { AddFlightSheetButton, ApplyFlightSheetButton, DeleteFlightSheetButton, EditFlightSheetButton, OpenFlightSheetDropdown } from "@/features/flight-sheet"
import { GenericList } from "@/widgets/generic-list"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Outlet } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"

export function FlightSheetsPage() {
  const { data } = useSuspenseQuery(flightSheetQueryOptions)

  const flightSheetsColumns: ColumnDef<FlightSheetType>[] = [
    { accessorKey: 'name', header: 'By Name' },
  ]

  const actions = [
    (id: string) => <ApplyFlightSheetButton flightSheetId={id}/>,
    (id: string) => <EditFlightSheetButton flightSheetId={id}/>,
    (id: string) => <DeleteFlightSheetButton flightSheetId={id}/>,
  ]

  return (
    <>
      <GenericList
        data={data.data}
        columns={flightSheetsColumns}
        sortable
        searchable
        renderAddButton={() => <AddFlightSheetButton />}
        renderItem={(item) => 
          <FlightSheetItem 
            flightSheet={item} 
            renderPanelActions={actions}
            renderOpenDropDownButton={(setOpen, open) => 
              <OpenFlightSheetDropdown setOpen={setOpen} open={open}/>}
          />}
      />
      <Outlet />
    </>
  )
}