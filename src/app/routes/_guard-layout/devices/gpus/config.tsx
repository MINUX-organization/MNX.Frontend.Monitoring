import { GpuPresetConfigModal } from '@/widgets/config-modal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guard-layout/devices/gpus/config')({
  component: GpuPresetConfigModal,
})