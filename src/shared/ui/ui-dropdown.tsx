import styles from './uiDropdown.module.scss';
import { Menu } from '@headlessui/react'
import { ReactNode } from "react";
import clsx from "clsx";
import _ from 'lodash';

export function UiDropdown<T>({
  className,
  options,
  label,
  getLabel,
  getOption,
  renderLabel,
  renderOption
} : {
  label: T,
  options: T[],
  className?: string;
  getLabel: (label: T) => string;
  getOption: (option: T) => string;
  renderLabel?: (label: T) => ReactNode;
  renderOption?: (option: T) => ReactNode;
}) {
  return (
    <div className={clsx(
      className,
      styles['wrapper']
    )}>
      <Menu>
        <Menu.Button>
          {renderLabel?.(label) ?? <span>{getLabel?.(label)}</span>}
        </Menu.Button>
        <Menu.Items>
          {_.map(options, (option) => (
            renderOption?.(option) ?? <div>{getOption?.(option)}</div>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  )
}