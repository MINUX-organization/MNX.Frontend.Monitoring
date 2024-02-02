import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./styles/uiAside.module.scss"
import _ from "lodash";

export function Aside({
  className,
  variant,
  elements
} : {
  className?: string;
  variant: 'vertical' | 'horizontal'
  elements?: ReactNode[]
}) {
  return (
    <aside className={clsx(
      className,
      styles['wrapper'],
      {
        vertical: styles['vertical'],
        horizontal: styles['horizontal']
      }[variant]
    )}>
      {_.map(elements, (element) => (
        element
      ))}
    </aside>
  )
}