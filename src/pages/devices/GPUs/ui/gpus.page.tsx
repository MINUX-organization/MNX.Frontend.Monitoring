import { GpuItem, GpuItemInfo } from '@/entities/devices/gpu'
import styles from './gpus.page.module.scss'
import { GpuItemPanel } from '@/entities/devices/gpu'
import _ from 'lodash'
import { DeviceGpu } from '@/entities/devices/gpu'
import { OnOpen } from '@/features/devices/gpu/on-open'
import { Settings } from '@/features/devices/gpu/settings'

const mockDeviceGpu: DeviceGpu[] = [
  {
    id: "gpu_id_1",
    index: 0,
    bus: 1,
    name: "GeForce RTX 3080",
    rigName: "Rig01",
    flightSheet: "flightsheet_001",
    minerName: "gminer",
    coreClock: {
      value: 1700,
      measureUnit: "MHz"
    },
    memoryClock: {
      value: 9500,
      measureUnit: "MHz"
    },
    criticalTemperature: 90,
    powerLimit: 250,
    manufacture: "NVIDIA",
    driver: "470.63.01",
    parallelComputingTechnology: {
      name: "CUDA",
      version: "2.0.0"
    },
    vendor: "NVIDIA",
    memorySize: {
      value: 10,
      measureUnit: "GiB"
    },
    memoryVendor: "Micron",
    memoryType: "GDDR6",
    biosVersion: "90.02.42.00.98",
    isActive: true,
    memTemperature: 75,
    coreTemperature: 65,
    fan: 70,
    power: 230,
    coins: [
      {
        coin: "eth",
        hashrate: {
          value: 95,
          measureUnit: "MH/s"
        },
        shares: {
          accepted: 1234,
          rejected: 12
        },
        performance: 0.95
      },
      {
        coin: "btc",
        hashrate: {
          value: 95,
          measureUnit: "MH/s"
        },
        shares: {
          accepted: 1234,
          rejected: 12
        },
        performance: 0.95
      },
      {
        coin: "rvn",
        hashrate: {
          value: 95,
          measureUnit: "MH/s"
        },
        shares: {
          accepted: 1234,
          rejected: 12
        },
        performance: 0.95
      }
    ] 
  }
];

export function GpusPage() {
  return (
    <div className={styles['gpus-page']}>
      <div className={styles['gpus-flex-container']}>
        <span className={styles['title']}>GPUs</span>
        {mockDeviceGpu && _.map(mockDeviceGpu, (gpu) => 
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
    </div>
  )
}