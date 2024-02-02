import { UiBorderBox } from "@/shared/ui/ui-border-box"
import { Shares } from "../../model/types"
import styles from './totalShares.module.scss'
import clsx from "clsx"
import { UiBgContainer } from "@/shared/ui/ui-bg-container"

type TotalSharesProps = {
  className?: string,
  shares?: Shares
}

export function TotalShares({
  className,
  shares
} : TotalSharesProps) {
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['wrapper']
    )}>
      <UiBgContainer color="opaque" className={styles['slot-1']}>
        <span>Total shares</span>
      </UiBgContainer>
      <UiBgContainer color="opaque" className={styles['slot-2']}>
        <span className={styles['text-gray']}>Accepted</span>
        <br/>
        <span className={styles['text-optimistic']}>{shares?.accepted ?? 'N/A'}</span>
      </UiBgContainer>
      <UiBgContainer color="opaque" className={styles['slot-3']}>
        <span className={styles['text-gray']}>Rejected</span>
        <br/>
        <span className={styles['text-negative']}>{shares?.accepted ?? 'N/A'}</span>
      </UiBgContainer>
    </UiBorderBox> 
  )
}