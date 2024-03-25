import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { RigTotal } from "../../model/types";
import styles from './styles/rigTotalItemInfo.module.scss';
import clsx from "clsx";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import _ from "lodash";

export function RigTotalItemInfo({
  rig,
  className
} : {
  rig: RigTotal,
  className?: string
}) {
  const firstColumn = [
    {label: 'AMD ver.', value: rig.info.amdVer},
    {label: 'NVIDIA ver.', value: rig.info.nvidiaVer},
    {label: 'OpenCL ver.', value: rig.info.openClVer},
    {label: 'CUDA ver.', value: rig.info.cudaVer},
  ]

  const secondColumn = [
    {label: 'Linux Ver.', value: rig.info.linuxVer},
    {label: 'Minux Ver.', value: rig.info.minuxVer},
  ]

  const thirdColumn = [
    {label: 'MAC', value: rig.info.mac},
    {label: 'Local IP', value: rig.info.localIp},
    {label: 'Global IP', value: rig.info.globalIp},
  ]

  const fields = [
    firstColumn,
    secondColumn,
    thirdColumn
  ]

  return (
    <UiBorderBox className={clsx(
      className,
      styles['rig-total-item-info']
    )}>
      <UiBgContainer color="opaque" className={styles['container']}>
        {_.map(fields, (column) => (
          <div key={column[0].label} className={styles['column']}>
            {_.map(column, (field) => (
              <div key={field.label} className={styles['field']}>
                <span className={styles['label']}>{field.label}</span>
                <span className={styles['value']}>{field.value}</span>
              </div>
            ))}
          </div>
        ))}
      </UiBgContainer>
    </UiBorderBox>
  )
}