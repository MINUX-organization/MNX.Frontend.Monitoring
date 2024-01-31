import clsx from "clsx";
import { ReactNode } from "react";
import styles from './uiBgContainer.module.scss'

export function UiBgContainer({
  className,
  color,
  children
} : {
  className?: string;
  color: 'opaque' | 'transparent';
  children: ReactNode;
}) {
  return (
    <div className={clsx(
      className,
      styles['wrapper'],
      {
        opaque: styles['opaque'],
        transparent: styles['transparent']
      }[color]
    )}>
      {children}
    </div>
  )
}