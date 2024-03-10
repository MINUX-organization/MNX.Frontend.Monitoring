import clsx from "clsx";
import styles from './styles/uiBorderBox.module.scss' 
import { ReactNode } from "react";

type Corners = {
  topRight: boolean;
  bottomRight: boolean;
  topLeft: boolean;
  bottomLeft: boolean;
}

type UiBorderBoxProps = {
  className?: string;
  children?: ReactNode;
  withPadding?: boolean
} & Partial<Corners>

export function UiBorderBox({
  className,
  children,
  withPadding,
  ...corners
 } : UiBorderBoxProps
 ) {
  return (
    <section className={clsx(
      className,
      styles['border-box'],
      withPadding && styles['padding'],
    )}>
      {corners.topLeft && <div className={styles['topLeft']}></div>}
      {corners.bottomLeft && <div className={styles['bottomLeft']}></div>}
      {corners.topRight && <div className={styles['topRight']}></div>}
      {corners.bottomRight && <div className={styles['bottomRight']}></div>}
      {children}
    </section>
  )
}