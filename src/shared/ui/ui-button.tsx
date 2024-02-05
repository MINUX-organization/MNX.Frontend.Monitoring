import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import styles from './styles/uiBgContainer.module.scss'

type UiButtonVariant = "transparent" | "opaque" | "outlined";
export type UiButtonProps = {
  variant: UiButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function UiButton({ className, variant, ...props }: UiButtonProps) {
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
      )}
    />
  );
}