import { AlgorithmsPage } from '@/pages/algorithms'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_guard-layout/_notification/mining/algorithms',
)({
  component: AlgorithmsPage,
})
