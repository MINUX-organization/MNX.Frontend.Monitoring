import { UiBorderBox } from "./ui-border-box";
import styles from './styles/uiLabelBoard.module.scss';
import clsx from "clsx";
import { ReactNode } from "react";
import _ from "lodash";

export function UiLabelBoard<T>({
  className,
  label,
  options,
  renderLabel,
  renderOption
} : {
  className?: string,
  label?: string,
  options?: T[];
  renderLabel?: (label?: string) => ReactNode;
  renderOption?: (option: T) => ReactNode;
}) { 
  return (
    <UiBorderBox withPadding className={clsx(
      className,
      styles['label-board']
    )}> 
      {renderLabel?.(label)} 
      <div className={styles['grid']}>
        {_.map(options, (option) => renderOption?.(option))} 
      </div>
    </UiBorderBox>
  )
}