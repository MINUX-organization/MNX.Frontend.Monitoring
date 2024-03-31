import { fromKeyToWord } from "@/shared/lib/utils/fromKeyToWord";
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
  rigCpuInfo: RigCpuInfo
}) {
  const color = rigCpuInfo.name.toLowerCase().includes('intel') ? 'blue' 
    : rigCpuInfo.name.toLowerCase().includes('amd') ? 'red' : 'white';

  const informationsList = [
    {label: 'Architecture', value: rigCpuInfo.architecture},
    {label: 'Cores', value: rigCpuInfo.coresCount},
    {label: 'Serial Number', value: rigCpuInfo.serialNumber},
    {label: 'Threads', value: rigCpuInfo.threadsCount},
    {label: 'Threads Per Socket', value: rigCpuInfo.threadsPerSocketCount},
  ]

  const clockingList = _.map(rigCpuInfo.clocking, (value, key) => {
    return {label: fromKeyToWord(key), value: value}
  })

  const tableFiledsList = [
    {label: 'Information', value: informationsList},
    {label: 'Clocking', value: clockingList},
  ]

  return (
    <div className={clsx(
        className,
        styles['rig-cpus-info']
      )}
    >
      <div className={styles['cpu']}>
        <span className={styles['cpu-name']}>{rigCpuInfo.name}</span>
        <CpuSvg className={styles['cpu-image']} color={color} width={80} height={80}/>
      </div>
      {_.map(tableFiledsList, (field) => (
        <UiColumnBoard key={field.label} title={field.label} data={field.value} isFlex />
      ))}
    </div>
  )
}