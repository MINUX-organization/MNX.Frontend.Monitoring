import { Listbox } from '@headlessui/react'
import { StateObject } from '../lib/utils/state-object'
import clsx from 'clsx'
import { ReactNode } from 'react';
import styles from './styles/uiSelect.module.scss'
import _ from 'lodash';
import { UiBorderBox } from './ui-border-box';
import { UiBgContainer } from './ui-bg-container';
import { title } from 'process';

type UiSelectProps<T> = {
  options?: T[];
  className?: string;
  selectedLabel?: string;
  selectedValue?: T;
  title?: string;
  selectedOnChange?: (e?: T) => void; 
  getOptionLabel?: (option?: T) => string | undefined;
  renderOption?: (option?: T) => ReactNode;
  renderLabel?: (selectedLabel?: string) => ReactNode;
}

export function UiSelect<T>({
  options,
  className,
  title,
  selectedLabel,
  getOptionLabel, 
  selectedValue,
  selectedOnChange,
  renderOption,
  renderLabel,
  ...props
} : UiSelectProps<T>) {
  return (
    <div className={clsx(
        className, 
        styles['select'],
      )}>
      <label>{title}</label>
      <Listbox {...props} as='div' value={selectedValue} onChange={selectedOnChange}>
        <Listbox.Button className={styles['button']}>
          <UiBorderBox>
            <UiBgContainer className={styles['padding']} color='opaque'>
              {renderLabel?.(selectedLabel)}
            </UiBgContainer>
          </UiBorderBox>
        </Listbox.Button>
        <Listbox.Options className={styles['options']}>
          {_.map(options, (option) => (
            <Listbox.Option
              key={getOptionLabel?.(option)}
              value={option}
            >
              {renderOption?.(option) ?? getOptionLabel?.(option)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}