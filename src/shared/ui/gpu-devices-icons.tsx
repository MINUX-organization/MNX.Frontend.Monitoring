import _ from 'lodash'
import { match } from 'ts-pattern'
import { CpuIcon, GpuIcon } from '../assets/svg'
import { Stack, StackProps } from '@chakra-ui/react'
import React from 'react'

export type Device = 'NvidiaGpu' | 'IntelGpu' | 'IntelCpu' | 'AmdGpu' | 'AmdCpu'

export function GpuDevicesIcons({ devices, ...props }: { devices: Device[] } & StackProps) {
  const sortedDevices = _.sortBy(devices, (device) => !_.endsWith(device, 'Gpu'))

  return (
    <Stack direction={'row'} {...props}>
      {_.map(sortedDevices, (device) => (
        <React.Fragment key={device}>
          {match(device)
            .with('NvidiaGpu', () => <GpuIcon  fill={'tech.nvidia'} />)
            .with('AmdGpu', () => <GpuIcon fill={'tech.amd'} />)
            .with('IntelGpu', () => <GpuIcon fill={'tech.intel'} />)
            .with('IntelCpu', () => <CpuIcon fill={'tech.intel'} />)
            .with('AmdCpu', () => <CpuIcon fill={'tech.amd'} />)
            .otherwise(() => null)}
        </React.Fragment>
      ))}
    </Stack>
  )
}