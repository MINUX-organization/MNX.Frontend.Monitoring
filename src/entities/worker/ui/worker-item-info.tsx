import clsx from "clsx";
import styles from './styles/workerItemInfo.module.scss';
import _ from "lodash";
import { WorkerInfo } from "../model/types";
import { UiAside } from "@/shared/ui/ui-aside";

export function WorkerItemInfo({ 
  className, 
  workerInfo
} : {
  className?: string;
  workerInfo?: Partial<WorkerInfo>;
}) {
  const fields = [
    {label: 'mining up time', value: workerInfo?.miningUpTime ?? 'N/A'},
    {label: 'booted up time', value: workerInfo?.bootedUpTime ?? 'N/A'},
    {label: 'local ip', value: workerInfo?.localIp ?? 'N/A'},
    {label: 'minux version', value: workerInfo?.minuxVersion ?? 'N/A'},
    {label: 'nvidia count', value: workerInfo?.nvidiaCount ?? 'N/A'},
    {label: 'amd count', value: workerInfo?.amdCount ?? 'N/A'},
    {label: 'intel count', value: workerInfo?.intelCount ?? 'N/A'}
  ]
  return ( 
    <UiAside 
      className={clsx(
        className,
        styles['wrapper']
      )}
      variant="horizontal"
    > 
      {_.map(fields, (field) => (
        <div key={field.label} className={styles['field']}>
          <span className={styles['label']}>{field.label}:</span> 
          <span>&nbsp;{field.value}</span> 
        </div>
      ))} 
    </UiAside>
  )
}