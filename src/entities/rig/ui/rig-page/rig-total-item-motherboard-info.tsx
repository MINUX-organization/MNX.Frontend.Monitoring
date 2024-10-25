import clsx from "clsx"
import styles from './styles/rigTotalItemMotherboardInfo.module.scss'
import motherboard from '@/shared/assets/images/motherboard.png'
import { RigMotherboardInfo } from "../.."
import { UiColumnBoard } from "@/shared/ui/ui-column-board"

export function RigTotalItemMotherboardInfo({
  className,
  rigMotherboard
} : {
  className?: string;
  rigMotherboard: RigMotherboardInfo;
}) {
  const informationFieldsList = [
    {label: 'Serial Number', value: rigMotherboard.information.serialNumber},
    {label: 'SATA ports', value: rigMotherboard.information.sataPortsCount},
    {label: 'RAM ports', value: rigMotherboard.information.ramPortsCount},
    {label: 'PCIe 4.0 x4', value: rigMotherboard.information.pciX4PosrtsCount},
    {label: 'PCIe 4.0 x16', value: rigMotherboard.information.pciX16PosrtsCount},
  ]

  return (
    <div className={clsx(
      className,
      styles['rig-motherboard-info']
    )}>
      <div className={styles['motherboard']}>
        <span className={styles['motherboard-name']}>
          {rigMotherboard.information.name}
        </span>
        <img className={styles['motherboard-image']} src={motherboard} alt={'motherboard'} />
      </div>
      <UiColumnBoard className={styles['table']} title="Information" data={informationFieldsList} />
    </div>
  )
}