import { flightSheetQueryOptions } from '@/entities/flight-sheet'
import { FlightSheetsPage } from '@/pages/flightsheets'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/setup/flight-sheets')({
  component: FlightSheetsPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(flightSheetQueryOptions)
  },
})