import clsx from "clsx";
import styles from './styles/uiHeader.module.scss';
import { UiLogo } from "./ui-logo";
import { ReactNode } from "react";

export function UiHeader({
  className,
  right,
  links,
}: {
  className?: string;
  links?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <header
      className={clsx( 
        className,
        styles['header']
      )}
    >
      <UiLogo className={styles['logo']}/>
      {links}
      {right}
    </header>
  );
}