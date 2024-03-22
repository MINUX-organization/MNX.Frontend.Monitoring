import { UiBgContainer } from './ui-bg-container';
import styles from './styles/uiSelect.module.scss';
import { UiBorderBox } from './ui-border-box';
import { Listbox } from '@headlessui/react';
import { ReactNode } from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import { ChevronDown } from 'lucide-react';

type UiSelectProps<T> = {
  options?: T[];
  title?: string;
  color?: 'opaque' | 'opaqueBlack' | 'transparent';
  selectedOption?: T;
  className?: string;
  placeholder?: string;
  selectedOnChange?: (option?: T) => void; 
  getOptionLabel?: (option?: T) => string | undefined;
  renderSelectedOption?: (selectedOption?: T) => ReactNode;
}

export function UiSelect<T>({
  options,
  className,
  title,
  color,
  getOptionLabel, 
  selectedOption,
  placeholder,
  selectedOnChange,
  renderSelectedOption,
  ...props
} : UiSelectProps<T>) {
  return ( 
    <div className={clsx(
        className, 
        styles['select'],
      )}>
      {title && <label>{title}</label>}
      <Listbox {...props} as='div' value={selectedOption || '' as T} onChange={selectedOnChange}>
        <Listbox.Button className={styles['button']}>
          <UiBorderBox>
            <UiBgContainer className={styles['select-container']} color={color ?? 'opaque'}>
              {selectedOption === '' || selectedOption === undefined ? (
                <span className={styles['text-gray']}>{placeholder ?? 'Select an option'}</span>
              ) : (
                renderSelectedOption?.(selectedOption) ?? <span></span>
              )}
              <ChevronDown className={styles['chevron']} size={20}/>
            </UiBgContainer>
          </UiBorderBox>
        </Listbox.Button>
        <Listbox.Options className={styles['options']}>
          {!options && 
            <span className={clsx(styles['no-options'], styles['text-gray'])}>
              There are no options...
            </span>
          } 
          {_.map(options, (option) => (
            <Listbox.Option
              className={styles['option']}
              key={getOptionLabel?.(option)}
              value={option}
            >
              {getOptionLabel?.(option)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}