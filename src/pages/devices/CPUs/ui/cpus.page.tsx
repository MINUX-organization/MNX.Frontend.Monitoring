import { DeviceCpu } from '@/entities/devices/cpu/model/types';
import styles from './cpus.page.module.scss'
import { CpuItemPanel } from '@/entities/devices/cpu';
import { Settings } from '@/features/devices/cpu';
import _ from 'lodash';

const mockDeviceCpu: DeviceCpu[] = [{
  id: '123456789',
  index: 0,
  isActive: true,
  clock: 3200,
  temperature: 95,
  fan: 80,
  power: 120,
  coins: [
    {
      coin: 'ETH',
      hashrate: { value: 30.5, measureUnit: 'MH/s' },
      shares: {
        accepted: 1234,
        rejected: 12,
      },
      performance: 95.2,
    }
  ],
  name: 'Intel Core i7-9700K',
  rigName: 'Mining Rig 1',
}];

export function CpusPage() {
  return (
    <div className={styles['cpus-page']}>
      <div className={styles['cpus-flex-container']}>
        <span className={styles['title']}>CPUs</span>
        {mockDeviceCpu && _.map(mockDeviceCpu, (cpu) => 
          <CpuItemPanel key={cpu.id} deviceCpu={cpu} renderSetting={(id) => <Settings cpuId={id} />} />
        )}
      </div>
    </div>
  )
}