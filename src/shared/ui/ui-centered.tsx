import clsx from "clsx"
import styles from './styles/uiCentered.module.scss'
import { ReactNode } from "react";

export function UiCentered({
  className,
  children
} : {
  className?: string;
  children: ReactNode
}) {
  return (
    <article className={clsx(
      className,
      styles['wrapper']
    )}>
      {children}
    </article>
  )
}