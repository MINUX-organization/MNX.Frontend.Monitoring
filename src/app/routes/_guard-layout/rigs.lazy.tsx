import { RigsPage } from '@/pages/rigs'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_guard-layout/rigs')({
  component: RigsPage,
})