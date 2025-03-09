import { presetGroupedByGpuQueryOptions } from '@/entities/preset'
import { PresetsPage } from '@/pages/presets'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/setup/presets')({
  component: PresetsPage,
  loader: ({ context: { queryClient }}) => {
    return queryClient.ensureQueryData(presetGroupedByGpuQueryOptions)
  }
})