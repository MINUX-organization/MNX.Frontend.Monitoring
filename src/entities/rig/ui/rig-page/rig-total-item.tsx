import { useStateObject } from '@/shared/lib/utils/state-object';
import styles from './styles/rigTotalItem.module.scss';
import { RigTotal } from "../../model/types";
import { Dispatch, ReactNode, SetStateAction } from "react";
import clsx from 'clsx';


export function RigTotalItem({
  className,
  rig,
  withFeatures = false,
  renderItemPanel,
  renderItemInfo
} : {
  className?: string;
  rig?: RigTotal;
  withFeatures?: boolean;
  renderItemPanel?: (
    rig?: RigTotal, 
    setIsOpen?: Dispatch<SetStateAction<boolean>>
  ) => ReactNode;
  renderItemInfo?: (rig?: RigTotal) => ReactNode;
}) {
  const isOpen = useStateObject(!withFeatures);

  return (
    <div className={clsx(
      className,
      styles['rig-total-item']
    )}>
      {renderItemPanel?.(rig, isOpen.setValue)}
      {isOpen && renderItemInfo?.(rig)}
    </div>
  )
}