import { minerQueryOptions } from '@/entities/miner/model/miner.repository'
import { poolQueryOptions } from '@/entities/pool'
import { walletQueryOptions } from '@/entities/wallet'
import { FlightSheetModal } from '@/widgets/flight-sheet-modal'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_guard-layout/setup/flight-sheets/config',
)({
  validateSearch: z.object({
    id: z.string().optional().catch(''),
  }),
  loader: ({ context: { queryClient }}) => {
    queryClient.ensureQueryData(minerQueryOptions)
    queryClient.ensureQueryData(walletQueryOptions)
    return queryClient.ensureQueryData(poolQueryOptions)  
  },
  component: FlightSheetModal,
})
