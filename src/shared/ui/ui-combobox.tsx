import { Combobox } from "@headlessui/react"
import { useStateObject } from "../lib/utils/state-object";
import styles from './styles/uiCombobox.module.scss';
import clsx from "clsx";
import _ from "lodash";
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

export function UiComboBox<T>({
  className,
  title,
  options,
  color,
  placeholder,
  getOptionLabel,
  isDisabled,
  selectedOption,
  selectedOnChange,
} : {
  className?: string;
  title?: string;
  placeholder?: string;
  color?: 'opaque' | 'opaqueBlack' | 'transparent';
  options?: T[];
  selectedOption?: T;
  isDisabled?: boolean;
  getOptionLabel: (option: T) => string;
  selectedOnChange?: (option?: T) => void;
}) {
  const query = useStateObject('')

  const filteredOptions =
    query.value === ''
      ? options
      : _.filter(options, (option) => {
          return getOptionLabel(option).toLowerCase().includes(query.value.toLowerCase())
        })
  console.log(selectedOption)
  return (
    <div className={clsx(className, styles['combobox'])}>
      {title && <label>{title}</label>}
      <Combobox disabled={isDisabled} value={selectedOption} onChange={selectedOnChange}>
        <div>
        <UiBorderBox className={styles['select']}>
          <UiBgContainer className={styles['select-container']} color={color ?? 'opaque'}>
            <Combobox.Input 
              className={styles['input']}
              placeholder={placeholder} 
              onChange={(event) => query.setValue(event.target.value)}
              
            /> 
            <Combobox.Button className={styles['button']}>
              <ChevronDown className={styles['chevron']} size={20}/>
            </Combobox.Button>
          </UiBgContainer>
        </UiBorderBox>
        <Combobox.Options className={clsx(
          styles['options'],
          {
            'opaque': styles['opaque'],
            'opaqueBlack': styles['opaque-black'],
            'transparent': styles['transparent']
          }[color ?? "opaque"]
        )}>
          {!filteredOptions || filteredOptions.length === 0 && 
            <span className={clsx(styles['no-options'], styles['text-gray'])}>
              There are no options...
            </span>
          } 
          {_.map(filteredOptions, (option) => (
            <Combobox.Option 
              className={styles['option']}
              key={getOptionLabel?.(option)} 
              value={getOptionLabel?.(option)}
            >
              {getOptionLabel?.(option)}
            </Combobox.Option>
          ))}
        </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}