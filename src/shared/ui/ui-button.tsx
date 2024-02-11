import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import styles from './styles/uiButton.module.scss'

type UiButtonVariant = {
  variant: "transparent" | "opaque" | "outlined";
  isActive?: boolean;
};
export type UiButtonProps = UiButtonVariant & ButtonHTMLAttributes<HTMLButtonElement>;

export function UiButton({ 
  className, 
  variant, 
  isActive, 
  children, 
  ...props 
} : UiButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        styles['wrapper'],
        {
          transparent: styles['transparent'],
          opaque: styles['opaque'],
          outlined: styles['outlined'],
        }[variant],
        isActive && styles['active']
      )}
    >
      {children}
    </button>
  );
}