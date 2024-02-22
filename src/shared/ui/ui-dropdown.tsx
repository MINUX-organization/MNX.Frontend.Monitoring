import styles from './styles/uiDropdown.module.scss';
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
      styles['dropdown']
    )}>
      <Menu>
        <Menu.Button className={styles['button']}>
          {renderLabel?.(label) ?? <span>{getLabel?.(label)}</span>}
        </Menu.Button>
        <Menu.Items className={styles['items']}>
        {_.map(options, (option) => (
          <Menu.Item key={getOption(option)}>
            {renderOption?.(option) ?? <div>{getOption?.(option)}</div>}
          </Menu.Item>
        ))} 
        </Menu.Items>
      </Menu>
    </div>
  )
}