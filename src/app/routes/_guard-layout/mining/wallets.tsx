import { walletQueryOptions } from '@/entities/wallet'
import { WalletsPage } from '@/pages/wallets'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/mining/wallets')({
  component: WalletsPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(walletQueryOptions)
  }
})