import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import styles from './styles/uiButton.module.scss'
import { match } from "ts-pattern";

type UiButtonVariant = {
  color: "transparent" | "opaque" | "red" | "blue";
  isActive?: boolean;
  withBorder?: boolean;
};
export type UiButtonProps = UiButtonVariant & ButtonHTMLAttributes<HTMLButtonElement>;

export function UiButton({ 
  className, 
  color, 
  isActive, 
  children,
  withBorder,
  ...props 
} : UiButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        styles['wrapper'],
        !withBorder && {
          transparent: styles['transparent'],
          opaque: styles['opaque'],
          red: styles['red'],
          blue: styles['blue']
        }[color],
        isActive && styles['active'],
        withBorder && styles['outline'],
        withBorder && {
          transparent: styles['outline-transparent'],
          opaque: styles['outline-opaque'],
          red: styles['outline-red'],
          blue: styles['outline-blue']
        }[color],
      )}
    >
      {
      match(withBorder)
        .with(true, () => 
          <div 
            className={clsx(
              styles['container'],
              {
                transparent: styles['transparent'],
                opaque: styles['opaque'],
                red: styles['red'],
                blue: styles['blue']
              }[color],
            )}
          >
            {children}
          </div>
        )
        .otherwise(() => children)
      }
    </button>
  );
}