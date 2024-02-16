import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import styles from './styles/workerItemPanel.module.scss';
import { Worker as Type } from "../model/types"
import clsx from "clsx";

export function WorkerItemPanel({
  className,
  worker,
  onClick
} : {
  className?: string;
  worker?: Type;
  onClick?: () => void;
}) {
  const {
    id,
    name,
    gpusState,
    isActive,
    onlineState,
    onlineSpeed,
    averageTemperature,
    fanSpeed,
    power
  } = {...worker}
  return (
    <UiBgContainer 
        className={clsx(
          className,
          styles['wrapper']
        )} 
        color="opaque"
        onClick={onClick}
      >
        <span className={styles['item-1']}>{id ?? 'N/A'}</span>
        <span className={styles['item-2']}>{name ?? 'N/A'}</span>
        <span className={styles['item-3']}>{gpusState ?? 'N/A'}</span>
        <span className={styles['item-4']}>{isActive ?? 'N/A'}</span>
        <div className={styles['item-5']}>
          <span>{onlineState ?? 'N/A'}</span>
          {onlineState && <span>&nbsp;{onlineSpeed?.value}</span>}
          {onlineState && <span>&nbsp;{onlineSpeed?.measureUnit}</span>}
        </div>
        <span className={styles['item-6']}>{averageTemperature ?? 'N/A'}</span>
        <span className={styles['item-7']}>{fanSpeed ?? 'N/A'}</span>
        <div className={styles['item-8']}>
          <span>{power?.value ?? 'N/A'}</span>
          <span className={styles['measure']}>{power?.measureUnit}</span>
        </div>
    </UiBgContainer>
  )
}