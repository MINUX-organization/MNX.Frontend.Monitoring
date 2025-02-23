import { FlightSheetModal } from '@/widgets/flight-sheet-modal'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_guard-layout/setup/flight-sheets/config')({
  validateSearch: z.object({
    id: z.string().optional().catch(''),
  }),
  component: FlightSheetModal,
})