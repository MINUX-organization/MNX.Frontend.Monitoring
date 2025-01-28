import styles from './cpus.page.module.scss'
// import { CpuItemPanel } from '@/entities/devices/cpu';
// import { Settings } from '@/features/devices/cpu';
// import _ from 'lodash';

export function CpusPage() {
  return (
    <div className={styles['cpus-page']}>
      <div className={styles['cpus-flex-container']}>
        <span className={styles['title']}>CPUs</span>
        {/* {mockDeviceCpu && _.map(mockDeviceCpu, (cpu) => 
          <CpuItemPanel key={cpu.id} deviceCpu={cpu} renderSetting={(id) => <Settings cpuId={id} />} />
        )} */}
      </div>
    </div>
  )
}