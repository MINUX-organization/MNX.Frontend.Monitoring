import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./styles/uiAside.module.scss"
import _ from "lodash";

export function UiAside<T>({
  className,
  variant,
  elements,
  renderElement,
  children
} : {
  className?: string;
  variant: 'vertical' | 'horizontal';
  elements?: T[];
  renderElement?: (element: T) => ReactNode;
  children?: ReactNode;
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
      {children}
      {_.map(elements, (element) => ( 
        renderElement?.(element)
      ))}
    </aside>
  )
}