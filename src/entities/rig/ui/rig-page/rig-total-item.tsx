import { StateObject, useStateObject } from '@/shared/lib/utils/state-object';
import styles from './styles/rigTotalItem.module.scss';
import { RigTotal } from "../../model/types";
import { ReactNode } from "react";
import clsx from 'clsx';


export function RigTotalItem({
  rig,
  className,
  withFeatures,
  renderItemPanel,
  renderItemInfo,
} : {
  rig: RigTotal;
  className?: string;
  withFeatures?: boolean;
  renderItemPanel?: (
    rig: RigTotal, 
    setIsOpen: StateObject<boolean>
  ) => ReactNode;
  renderItemInfo?: (rig?: RigTotal) => ReactNode;
}) {
  const isOpen = useStateObject(!withFeatures);

  return (
    <div className={clsx(
      className,
      styles['rig-total-item']
    )}> 
      {renderItemPanel?.(rig, isOpen)} 
      {isOpen.value && renderItemInfo?.(rig)} 
    </div>
  )
}