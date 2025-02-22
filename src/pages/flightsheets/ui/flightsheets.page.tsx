import { flightSheetQueryOptions, FlightSheetType } from "@/entities/flight-sheet"
import { AddFlightSheetButton } from "@/features/flight-sheet"
import { GenericList } from "@/widgets/generic-list"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Outlet } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"

export function FlightSheetsPage() {
  const { data } = useSuspenseQuery(flightSheetQueryOptions)

  const flightSheetsColumns: ColumnDef<FlightSheetType>[] = [
    { accessorKey: 'name', header: 'By Name' },
  ]

  return (
    <>
      <GenericList 
        data={data.data} 
        columns={flightSheetsColumns} 
        sortable 
        searchable 
        renderAddButton={() => <AddFlightSheetButton />}
      />
      <Outlet />
    </>
  )
}