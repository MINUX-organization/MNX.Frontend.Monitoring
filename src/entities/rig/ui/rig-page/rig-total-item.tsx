import { useStateObject } from '@/shared/lib/utils/state-object';
import styles from './styles/rigTotalItem.module.scss';
import { RigTotal } from "../../model/types";
import { Dispatch, ReactNode, SetStateAction } from "react";
import clsx from 'clsx';


export function RigTotalItem({
  rig,
  className,
  withFeatures,
  renderItemPanel,
  renderItemInfo,
  renderBackButton
} : {
  rig: RigTotal;
  className?: string;
  withFeatures?: boolean;
  renderItemPanel?: (
    rig: RigTotal, 
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => ReactNode;
  renderItemInfo?: (rig?: RigTotal) => ReactNode;
  renderBackButton?: () => ReactNode;
}) {
  const isOpen = useStateObject(!withFeatures);

  return (
    <div className={clsx(
      className,
      styles['rig-total-item']
    )}>
      {renderBackButton && 
        <div className={styles['rig-total-item-header']}>
          {renderBackButton?.()}
        </div>
      }
      <div className={styles['rig-total-item-body']}>
        {renderItemPanel?.(rig, isOpen.setValue)} 
        {isOpen.value && renderItemInfo?.(rig)} 
      </div>
    </div>
  )
}