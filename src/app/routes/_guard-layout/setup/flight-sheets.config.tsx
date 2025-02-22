import { FlightSheetModal } from '@/widgets/flight-sheet-modal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/setup/flight-sheets/config')({
  component: FlightSheetModal,
})