import clsx from "clsx"
import styles from './styles/rigTotalItemMotherboardInfo.module.scss'
import motherboard from '@/shared/assets/images/motherboard.png'
import { RigMotherboardInfo } from "../.."
import { UiColumnBoard } from "@/shared/ui/ui-column-board"

export function RigTotalItemMotherboardInfo({
  className,
  rigMotherboard
} : {
  className?: string
  rigMotherboard: RigMotherboardInfo
}) {
  const informationFieldsList = [
    {label: 'Serial Number', value: rigMotherboard.serialNumber},
    {label: 'SATA ports', value: rigMotherboard.sataPortsCount},
    {label: 'RAM ports', value: rigMotherboard.ramPortsCount},
    {label: 'PCIe 4.0 x4', value: rigMotherboard.pcix4Count},
    {label: 'PCIe 4.0 x16', value: rigMotherboard.pcix16Count},
  ]

  return (
    <div className={clsx(
      className,
      styles['rig-motherboard-info']
    )}>
      <div className={styles['motherboard']}>
        <span className={styles['motherboard-name']}>
          {rigMotherboard.name}
        </span>
        <img className={styles['motherboard-image']} src={motherboard} alt={'motherboard'} />
      </div>
      <UiColumnBoard title="Information" data={informationFieldsList} />
    </div>
  )
}