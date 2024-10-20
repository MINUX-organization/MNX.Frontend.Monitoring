import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import styles from './styles/uiButton.module.scss'
import { match } from "ts-pattern";

type UiButtonVariant = {
  color?: "transparent" | "opaque" | "red" | "blue" | "green" | "none";
  isActive?: boolean;
  withBorder?: boolean;
  isClickable?: boolean;
};
export type UiButtonProps = UiButtonVariant & ButtonHTMLAttributes<HTMLButtonElement>;

export function UiButton({ 
  className, 
  color, 
  isActive, 
  children,
  withBorder,
  isClickable = true,
  ...props 
} : UiButtonProps) {
  return (
    <button
      {...props}
      disabled={!isClickable}
      className={clsx(
        className,
        !isClickable && styles['not-clickable'],
        styles['button'],
        !withBorder && color && {
          transparent: styles['transparent'],
          opaque: styles['opaque'],
          red: styles['red'],
          blue: styles['blue'],
          green: styles['green'],
          none: styles['none']
        }[color],
        isActive && styles['active'],
        withBorder && styles['outline'],
        withBorder && color && {
          transparent: styles['outline-transparent'],
          opaque: styles['outline-opaque'],
          red: styles['outline-red'],
          blue: styles['outline-blue'],
          green: styles['outline-green'],
          none: styles['outline-none'],
        }[color],
      )}
    >
      {
      match(withBorder)
        .with(true, () => 
          <div 
            className={clsx(
              styles['container'],
              color && {
                transparent: styles['transparent'],
                opaque: styles['opaque'],
                red: styles['red'],
                blue: styles['blue'],
                green: styles['green'],
                none: styles['none'],
              }[color],
            )}
          >
            <span className={styles['text']}>{children}</span>
          </div>
        )
        .otherwise(() => children)
      }
    </button>
  );
}