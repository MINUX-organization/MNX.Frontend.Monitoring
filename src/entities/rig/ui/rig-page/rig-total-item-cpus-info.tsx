import styles from './styles/rigTotalItemCpusInfo.module.scss'
import { UiColumnBoard } from "@/shared/ui/ui-column-board";
import { CpuSvg } from '@/shared/assets/images/cpu.tsx'
import { RigCpuInfo } from "../..";
import clsx from "clsx";
import _ from "lodash";

export function RigTotalItemCpusInfo({
  className,
  rigCpuInfo
} : {
  className?: string;
  rigCpuInfo: RigCpuInfo;
}) {
  const color = rigCpuInfo.information.name.toLowerCase().includes('intel') ? 'blue' 
    : rigCpuInfo.information.name.toLowerCase().includes('amd') ? 'red' : 'white';

  const informationsList = [
    {label: 'Architecture', value: rigCpuInfo.information.architecture},
    {label: 'Cores', value: rigCpuInfo.information.coresCount},
    {label: 'Threads', value: rigCpuInfo.information.threadsCount},
  ]

  const clockingList = [
    {label: 'Clock', value: rigCpuInfo.restrictions.clock.minimal + ' - ' + rigCpuInfo.restrictions.clock.maximal, measureUnit: 'MHz'},
    {label: 'Fan Speed', value: rigCpuInfo.restrictions.fanSpeed.minimal + ' - ' + rigCpuInfo.restrictions.fanSpeed.maximal, measureUnit: '%'},
    {label: 'Temperature', value: rigCpuInfo.restrictions.temperature.minimal + ' - ' + rigCpuInfo.restrictions.temperature.maximal, measureUnit: '°C'},
    {label: 'Power', value: rigCpuInfo.restrictions.power.minimal + ' - ' + rigCpuInfo.restrictions.power.maximal, measureUnit: 'W'},
  ]

  const cacheList = [
    {label: 'L1', value: rigCpuInfo.information.cache.l1},
    {label: 'L2', value: rigCpuInfo.information.cache.l2},
    {label: 'L3', value: rigCpuInfo.information.cache.l3},
    {label: 'L4', value: rigCpuInfo.information.cache.l4},
  ]

  const tableFiledsList = [
    {label: 'Information', value: informationsList},
    {label: 'Clocking', value: clockingList},
    {label: 'Cache', value: cacheList},
  ]

  return (
    <div className={clsx(
        className,
        styles['rig-cpus-info']
      )}
    >
      <div className={styles['cpu']}>
        <span className={styles['cpu-name']}>{rigCpuInfo.information.name}</span>
        <CpuSvg className={styles['cpu-image']} color={color} width={80} height={80}/>
      </div>
      {_.map(tableFiledsList, (field) => (
        <UiColumnBoard className={styles['table']} key={field.label} title={field.label} data={field.value} isFlex />
      ))}
    </div>
  )
}