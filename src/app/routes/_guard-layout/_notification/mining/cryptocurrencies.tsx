import { createFileRoute } from '@tanstack/react-router'
import { CryptocurrenciesPage } from '@/pages/cryptocurrencies'
import { cryptocurrencyQueryOptions } from '@/entities/cryptocurrency'

export const Route = createFileRoute(
  '/_guard-layout/_notification/mining/cryptocurrencies',
)({
  component: CryptocurrenciesPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(cryptocurrencyQueryOptions)
  },
})
