import { RigHddInfo } from "../..";
import hddImage from '@/shared/assets/images/hdd.svg'
import styles from './styles/rigTotalItemHddInfo.module.scss'
import clsx from "clsx";
import { UiColumnBoard } from "@/shared/ui/ui-column-board";

export function RigTotalItemHddInfo({
  className,
  rigHdd
} : {
  className?: string;
  rigHdd: RigHddInfo
}) {
  const fieldsList = [
    {label: 'Serial Number', value: rigHdd.serialNumber},
    {label: 'Capacity', value: rigHdd.capacity},
  ]

  return (
    <div className={clsx(
      className,
      styles['hdd-info']
    )}>
      <div className={styles['hdd-info-item']}>
        <span className={styles['hdd-name']}>{rigHdd.name}</span>
        <img width={50} src={hddImage} alt="hdd"/>
        <div className={styles['hdd-item']}>
          <UiColumnBoard data={fieldsList} />
        </div>
      </div>
    </div>
  )
}