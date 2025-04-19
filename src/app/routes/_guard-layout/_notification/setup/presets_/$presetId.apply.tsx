import { PresetApplyPage } from '@/pages/presets'
import { createFileRoute } from '@tanstack/react-router'
import {
  presetByIdQueryOptions,
  presetRigDevicesQueryOptions,
  presetRigDevicesSupportQueryOptions,
} from '@/entities/preset'

export const Route = createFileRoute(
  '/_guard-layout/_notification/setup/presets_/$presetId/apply',
)({
  preloadStaleTime: 0,
  loader: ({ context: { queryClient }, params: { presetId } }) => {
    queryClient.prefetchQuery(presetByIdQueryOptions(presetId))
    queryClient.prefetchQuery(presetRigDevicesQueryOptions(presetId))
    queryClient.prefetchQuery(presetRigDevicesSupportQueryOptions(presetId))
  },
  onLeave: ({ context: { queryClient }, params: { presetId } }) => {
    queryClient.removeQueries(presetByIdQueryOptions(presetId))
    queryClient.removeQueries(presetRigDevicesQueryOptions(presetId))
    queryClient.removeQueries(presetRigDevicesSupportQueryOptions(presetId))
  },
  component: PresetApplyPage,
})
