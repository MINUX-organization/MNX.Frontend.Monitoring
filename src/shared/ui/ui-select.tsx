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
  selectedValue?: T;
  className?: string;
  placeholder?: string;
  selectedOnChange?: (option?: T) => void; 
  getOptionLabel?: (option?: T) => string | undefined;
  renderOption?: (option?: T) => ReactNode;
  renderSelectedValue?: (selectedValue?: T) => ReactNode;
}

export function UiSelect<T>({
  options,
  className,
  title,
  getOptionLabel, 
  selectedValue,
  placeholder,
  selectedOnChange,
  renderOption,
  renderSelectedValue,
  ...props
} : UiSelectProps<T>) {
  return ( 
    <div className={clsx(
        className, 
        styles['select'],
      )}>
      <label>{title}</label>
      <Listbox {...props} as='div' value={selectedValue || '' as T} onChange={selectedOnChange}>
        <Listbox.Button className={styles['button']}>
          <UiBorderBox>
            <UiBgContainer className={styles['select-container']} color='opaque'>
              {selectedValue === '' || selectedValue === undefined ? (
                <span className={styles['text-gray']}>{placeholder ?? 'Select an option'}</span>
              ) : (
                renderSelectedValue?.(selectedValue) ?? <span></span>
              )}
              <ChevronDown className={styles['chevron']} size={20}/>
            </UiBgContainer>
          </UiBorderBox>
        </Listbox.Button>
        <Listbox.Options className={styles['options']}>
          {_.map(options, (option) => (
            <Listbox.Option
              className={styles['option']}
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