import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import endsWith from 'lodash/endsWith'
import { match } from 'ts-pattern'
import { CpuIcon, GpuIcon } from '../assets/svg'
import { Stack, StackProps } from '@chakra-ui/react'
import React from 'react'

export type Device = 'NvidiaGpu' | 'IntelGpu' | 'IntelCpu' | 'AmdGpu' | 'AmdCpu' | 'Amd' | 'Intel' | 'Nvidia'

export function DevicesIcons({ devices, wi, he, ...props }: { devices: Device[], wi?: string, he?: string } & StackProps) {
  const sortedDevices = sortBy(devices, (device) => !endsWith(device.toLowerCase(), 'gpu'))

  return (
    <Stack direction={'row'} {...props}>
      {map(sortedDevices, (device) => (
        <React.Fragment key={device}>
          {match(device.toLowerCase())
            .with('nvidiagpu', () => <GpuIcon width={wi} height={he} fill={'tech.nvidia'} />)
            .with('amdgpu', () => <GpuIcon width={wi} height={he} fill={'tech.amd'} />)
            .with('intelgpu', () => <GpuIcon width={wi} height={he} fill={'tech.intel'} />)
            .with('intelcpu', () => <CpuIcon width={wi} height={he} fill={'tech.intel'} />)
            .with('amdcpu', () => <CpuIcon width={wi} height={he} fill={'tech.amd'} />)
            .with('amd', () => <GpuIcon width={wi} height={he} fill={'tech.amd'} />)
            .with('intel', () => <CpuIcon width={wi} height={he} fill={'tech.intel'} />)
            .with('nvidia', () => <GpuIcon width={wi} height={he} fill={'tech.nvidia'} />)
            .otherwise(() => null)}
        </React.Fragment>
      ))}
    </Stack>
  )
}