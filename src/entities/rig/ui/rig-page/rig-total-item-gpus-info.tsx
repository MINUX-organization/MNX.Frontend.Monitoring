import { RigGpuInfo } from '../../model/gpu-info';
import styles from './styles/rigTotalItemGpusInfo.module.scss'
import gpuImage from '@/shared/assets/images/gpu_fan_1.svg'
import _ from 'lodash';
import { fromKeyToWord } from '@/shared/lib/utils/fromKeyToWord';
import { UiColumnBoard } from '@/shared/ui/ui-column-board';
import clsx from 'clsx';

export function RigTotalItemGpusInfo({
  className,
  rigGpuInfo
} : {
  className?: string;
  rigGpuInfo: RigGpuInfo;
}) {
  const parametersFieldsList = _.map(rigGpuInfo.parameters, (value, key) => {
    return {label: fromKeyToWord(key), value: value}
  })

  const overclockingFieldsList = _.map(rigGpuInfo.overclocking, (value, key) => {
    return {label: fromKeyToWord(key), value: value}
  })

  const informationFieldsList = [
    {label: 'PCI Bus ID', value: rigGpuInfo.information.pciBusId},
    {label: 'Serial Number', value: rigGpuInfo.information.serialNumber},
    {label: 'Memory', value: rigGpuInfo.information.memory},
    {label: 'Driver Ver.', value: rigGpuInfo.information.driverVersion},
    {
      label: `${rigGpuInfo.information.parallelComputingTechnology.name} Ver.`, 
      value: rigGpuInfo.information.parallelComputingTechnology.version
    },
  ]

  const tableFieldsList = [
    {label: 'Parameters', data: parametersFieldsList},
    {label: 'Overclocking', data: overclockingFieldsList},
    {label: 'Information', data: informationFieldsList},
  ] 

  return (
    <div className={clsx(
      className,
      styles['rig-gpus-info']
    )}>
      <div className={styles['gpu']}>
        <span className={styles['gpu-name']}>{rigGpuInfo.name}</span>
        <img width={140} src={gpuImage} alt="gpu_image" />
        <div className={styles['gpu-info']}>
          <span>
            <span className={styles['blue']}>ID</span>&nbsp;
            {rigGpuInfo.index}
          </span>
          <span>
            <span className={styles['blue']}>BUS</span>&nbsp;
            {rigGpuInfo.bus}
          </span>
        </div>
      </div>
      {_.map(tableFieldsList, ({label, data}) => (
        <UiColumnBoard key={label} title={label} data={data} isFlex />
      ))}
    </div>
  )
}