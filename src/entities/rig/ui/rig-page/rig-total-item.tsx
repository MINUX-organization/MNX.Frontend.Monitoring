import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './styles/rigTotalItem.module.scss';
import clsx from "clsx";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";

export function RigTotalItem({
  className
} : {
  className?: string;
  
}) {
  return (
    <UiBorderBox className={clsx(
        className,
        styles['rig-total-item']
      )}
    >
      <UiBgContainer color="opaque">

      </UiBgContainer>
    </UiBorderBox>
  )
}