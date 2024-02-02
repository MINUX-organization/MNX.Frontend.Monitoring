import clsx from "clsx";
import styles from './uiBorderBox.module.scss' 
import { ReactNode } from "react";

type Corners = {
  topRight: boolean;
  lowerRight: boolean;
  topLeft: boolean;
  lowerLeft: boolean;
}

type UiBorderBoxProps = {
  className?: string;
  children?: ReactNode;
} & Partial<Corners>

export function UiBorderBox({
  className,
  children,
  ...corners
 } : UiBorderBoxProps
 ) {
  return (
    <section className={clsx(
      className,
      styles['wrapper'],
      corners.topLeft && styles['topLeft'],
      corners.lowerLeft && styles['lowerLeft'],
      corners.topRight && styles['topRight'],
      corners.lowerRight && styles['lowerRight']
    )}>
      {children}
    </section>
  )
}