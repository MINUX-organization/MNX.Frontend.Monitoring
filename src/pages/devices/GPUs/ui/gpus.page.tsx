import { DeviceGpu, GpuItem, GpuItemInfo, useGpusListQuery } from '@/entities/devices/gpu'
import styles from './gpus.page.module.scss'
import { GpuItemPanel } from '@/entities/devices/gpu'
import _ from 'lodash'
import { OnOpen } from '@/features/devices/gpu/on-open'
import { Settings } from '@/features/devices/gpu/settings'
import { Outlet } from 'react-router'
import { useDevicesStream } from '../../hooks/devices-stream'

export function GpusPage() {
  const { data: gpusList } = useGpusListQuery();
  const gpuDynamicIndicators = useDevicesStream();

  const dynamicMap = _.keyBy(gpuDynamicIndicators?.gpuDynamicTotalIndicators, 'deviceId');

  const mergedGpusList = _.map(gpusList, (gpu) => {
    const dynamic = dynamicMap[gpu.id];
    return {
      ...gpu,
      ...dynamic
    } as DeviceGpu
  });

  return (
    <div className={styles['gpus-page']}>
      <div className={styles['gpus-flex-container']}>
        <span className={styles['title']}>GPUs</span>
        {_.map(mergedGpusList, (gpu) => 
          <GpuItem 
            key={gpu.id}
            deviceGpu={gpu} 
            renderItemPanel={(gpu, isOpen) => 
              <GpuItemPanel 
                deviceGpu={gpu} 
                isOpen={isOpen} 
                renderOnOpen={(isOpen) => <OnOpen isOpen={isOpen}/>}
                renderSetting={(id) => <Settings gpuId={id} />} 
              />}
            renderItemInfo={(gpu) => <GpuItemInfo deviceGpu={gpu}/>}
          />)} 
      </div>
      <Outlet />
    </div>
  )
}