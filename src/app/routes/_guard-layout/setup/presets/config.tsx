import { gpuUniqueNamesOptions } from '@/entities/devices'
import { PresetConfigModal } from '@/widgets/config-modal'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_guard-layout/setup/presets/config')({
  preloadStaleTime: 0,
  validateSearch: z.object({
    presetId: z.string().optional().catch(''),
  }),
  loader: ({ context: { queryClient }, }) => {
    return queryClient.prefetchQuery(gpuUniqueNamesOptions)
  },
  component: PresetConfigModal,
})