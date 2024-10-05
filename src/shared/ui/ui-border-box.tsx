import clsx from "clsx";
import styles from './styles/uiBorderBox.module.scss' 
import { HTMLProps, ReactNode } from "react";

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
} & Partial<Corners> & HTMLProps<HTMLDivElement>

export function UiBorderBox({
  className,
  children,
  withPadding,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  ...props
 } : UiBorderBoxProps
 ) {
  return (
    <section className={clsx(
      className,
      styles['border-box'],
      withPadding && styles['padding'],
    )}
      {...props}
    >
      {topLeft && <div className={styles['topLeft']}></div>}
      {bottomLeft && <div className={styles['bottomLeft']}></div>}
      {topRight && <div className={styles['topRight']}></div>}
      {bottomRight && <div className={styles['bottomRight']}></div>}
      {children}
    </section>
  )
}