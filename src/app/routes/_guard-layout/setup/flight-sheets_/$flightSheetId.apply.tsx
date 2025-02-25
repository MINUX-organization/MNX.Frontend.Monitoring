import { 
  flightSheetByIdQueryOptions, 
  flightSheetRigDevicesQueryOptions, 
  flightSheetRigDevicesSupportQueryOptions 
  } from '@/entities/flight-sheet'
import { FlightSheetApplyPage } from '@/pages/flightsheets'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_guard-layout/setup/flight-sheets_/$flightSheetId/apply',
)({
  loader: ({ context: { queryClient }, params: { flightSheetId } }) => {
    queryClient.ensureQueryData(flightSheetRigDevicesSupportQueryOptions(flightSheetId))
    queryClient.ensureQueryData(flightSheetRigDevicesQueryOptions(flightSheetId))
    return queryClient.ensureQueryData(flightSheetByIdQueryOptions(flightSheetId))
  },
  component: FlightSheetApplyPage,
})
