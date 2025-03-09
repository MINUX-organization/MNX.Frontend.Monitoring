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
  preloadStaleTime: 0,
  loader: ({ context: { queryClient }, params: { flightSheetId } }) => {
    queryClient.prefetchQuery(flightSheetByIdQueryOptions(flightSheetId))
    queryClient.prefetchQuery(flightSheetRigDevicesSupportQueryOptions(flightSheetId))
    queryClient.prefetchQuery(flightSheetRigDevicesQueryOptions(flightSheetId))
  },
  component: FlightSheetApplyPage,
})