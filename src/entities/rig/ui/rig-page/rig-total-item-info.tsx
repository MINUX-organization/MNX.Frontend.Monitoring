import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { RigTotal } from "../../model/types";
import styles from './styles/rigTotalItemInfo.module.scss';
import clsx from "clsx";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";

export function RigTotalItemInfo({
  rig,
  className
} : {
  rig: RigTotal,
  className?: string
}) {
  return (
    <UiBorderBox className={clsx(
      className,
      styles['rig-total-item-info']
    )}>
      <UiBgContainer color="opaque" className={styles['container']}>
        
      </UiBgContainer>
    </UiBorderBox>
  )
}