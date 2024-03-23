import clsx from "clsx";
import styles from './styles/rigItemInfo.module.scss';
import _ from "lodash";
import { RigInfo } from "../../model/types";
import { UiAside } from "@/shared/ui/ui-aside";

export function RigItemInfo({ 
  className, 
  rigInfo
} : {
  className?: string;
  rigInfo?: Partial<RigInfo>;
}) {
  const fields = [
    {label: 'mining up time', value: rigInfo?.miningUpTime ?? 'N/A'},
    {label: 'booted up time', value: rigInfo?.bootedUpTime ?? 'N/A'},
    {label: 'local ip', value: rigInfo?.localIp ?? 'N/A'},
    {label: 'minux version', value: rigInfo?.minuxVersion ?? 'N/A'},
    {label: 'nvidia count', value: rigInfo?.nvidiaCount ?? 'N/A'},
    {label: 'amd count', value: rigInfo?.amdCount ?? 'N/A'},
    {label: 'intel count', value: rigInfo?.intelCount ?? 'N/A'}
  ]
  return ( 
    <UiAside 
      className={clsx(
        className,
        styles['rig-info']
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