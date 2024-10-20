import clsx from "clsx";
import styles from './styles/uiBorderBox.module.scss' 
import { HTMLProps, ReactNode } from "react";


type Corners = {
  topRight: boolean;
  bottomRight: boolean;
  topLeft: boolean;
  bottomLeft: boolean;
  cornerColor?: 'opaque' | 'bgColor';
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
  cornerColor,
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
      {topLeft && <div className={clsx(
        styles['topLeft'], 
        cornerColor && {
          bgColor: styles['bg-color'],
          opaque: styles['opaque'],
        }[cornerColor]
      )}/>}
      {bottomLeft && <div className={clsx(
        styles['bottomLeft'], 
        cornerColor && {
          bgColor: styles['bg-color'],
          opaque: styles['opaque'],
        }[cornerColor]
      )}/>}
      {topRight && <div className={clsx(
        styles['topRight'], 
        cornerColor && {
          bgColor: styles['bg-color'],
          opaque: styles['opaque'],
        }[cornerColor]
      )}/>}
      {bottomRight && <div className={clsx(
        styles['bottomRight'], 
        cornerColor && {
          bgColor: styles['bg-color'],
          opaque: styles['opaque'],
        }[cornerColor]
      )}/>}
      {children}
    </section>
  )
}