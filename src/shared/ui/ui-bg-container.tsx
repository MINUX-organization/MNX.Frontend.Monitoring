import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import styles from './styles/uiBgContainer.module.scss'

type UiBgContainerProps = {
  className?: string;
  color: 'opaque' | 'transparent';
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>

export function UiBgContainer({
  className,
  color,
  children,
  ...props
} : UiBgContainerProps) {
  return (
    <div 
      {...props}
      className={clsx(
        className,
        styles['bg-container'],
        {
          opaque: styles['opaque'],
          transparent: styles['transparent']
        }[color]
    )}>
      {children} 
    </div>
  )
}