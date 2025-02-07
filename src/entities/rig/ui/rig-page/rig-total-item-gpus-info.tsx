import { RigGpuInfo } from '../../model/gpu-info';
import styles from './styles/rigTotalItemGpusInfo.module.scss'
import gpuImage from '@/shared/assets/images/gpu_fan_1.svg'
import _ from 'lodash';
import { UiColumnBoard } from '@/shared/ui/ui-column-board';
import clsx from 'clsx';

export function RigTotalItemGpusInfo({
  className,
  rigGpuInfo
} : {
  className?: string;
  rigGpuInfo: RigGpuInfo;
}) {
  const overclockingFieldsList = [
    {label: 'Core clock offset', value: rigGpuInfo.restrictions.clock.core.offset.minimal + ' - ' + rigGpuInfo.restrictions.clock.core.offset.maximal, measureUnit: 'MHz'},
    {label: 'Core clock lock', value: rigGpuInfo.restrictions.clock.core.lock.minimal + ' - ' + rigGpuInfo.restrictions.clock.core.lock.maximal, measureUnit: 'MHz'},
    {label: 'Memory clock offset', value: rigGpuInfo.restrictions.clock.memory.offset.minimal + ' - ' + rigGpuInfo.restrictions.clock.memory.offset.maximal, measureUnit: 'MHz'},
    {label: 'Memory clock lock', value: rigGpuInfo.restrictions.clock.memory.lock.minimal + ' - ' + rigGpuInfo.restrictions.clock.memory.lock.maximal, measureUnit: 'MHz'},
    {label: 'Core voltage offset', value: rigGpuInfo.restrictions.voltage.core.offset.minimal + ' - ' + rigGpuInfo.restrictions.voltage.core.offset.maximal, measureUnit: 'mV'},
    {label: 'Core voltage lock', value: rigGpuInfo.restrictions.voltage.core.lock.minimal + ' - ' + rigGpuInfo.restrictions.voltage.core.lock.maximal, measureUnit: 'mV'},
    {label: 'Memory voltage offset', value: rigGpuInfo.restrictions.voltage.memory.offset.minimal + ' - ' + rigGpuInfo.restrictions.voltage.memory.offset.maximal, measureUnit: 'mV'},
    {label: 'Memory voltage lock', value: rigGpuInfo.restrictions.voltage.memory.lock.minimal + ' - ' + rigGpuInfo.restrictions.voltage.memory.lock.maximal, measureUnit: 'mV'},
  ]

  const parametersFieldsList = [
    {label: 'Power', value: rigGpuInfo.restrictions.power.minimal + ' - ' + rigGpuInfo.restrictions.power.maximal, measureUnit: 'W'},
    {label: 'Fan Speed', value: rigGpuInfo.restrictions.fanSpeed.minimal + ' - ' + rigGpuInfo.restrictions.fanSpeed.maximal, measureUnit: '%'},
    {label: 'Temperature', value: rigGpuInfo.restrictions.temperature.core.minimal + ' - ' + rigGpuInfo.restrictions.temperature.core.maximal, measureUnit: '°C'},
  ]

  const informationFieldsList = [
    {label: 'PCI Bus ID', value: rigGpuInfo.pci.id},
    {label: 'Serial Number', value: rigGpuInfo.information.serialNumber},
    {label: 'Memory', value: rigGpuInfo.information.memory.total, measureUnit: 'GB'},
    {
      label:  rigGpuInfo.information.technology.type,
      value: `${rigGpuInfo.information.technology.version} Ver.`,
    },
  ]

  const tableFieldsList = [
    {label: 'Overclocking', data: overclockingFieldsList},
    {label: 'Parameters', data: parametersFieldsList},
    {label: 'Information', data: informationFieldsList},
  ] 

  return (
    <div className={clsx(
      className,
      styles['rig-gpus-info']
    )}>
      <div className={styles['gpu']}>
        <span className={styles['gpu-name']}>{rigGpuInfo.information.name}</span>
        <img width={140} src={gpuImage} alt="gpu_image" />
        <div className={styles['gpu-info']}>
          <span className={styles['text']}>
            <span className={styles['blue']}>ID</span>&nbsp;
            {rigGpuInfo.id}
          </span>
          <span>
            <span className={styles['blue']}>BUS</span>&nbsp;
            {rigGpuInfo.pci.bus}
          </span>
        </div>
      </div>
      {_.map(tableFieldsList, ({label, data}) => (
        <UiColumnBoard className={styles['table']} key={label} title={label} data={data} isFlex />
      ))}
    </div>
  )
}