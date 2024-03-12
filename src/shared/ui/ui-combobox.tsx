import { Combobox } from "@headlessui/react"
import { useStateObject } from "../lib/utils/state-object";
import styles from './styles/uiCombobox.module.scss';
import clsx from "clsx";
import _ from "lodash";
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";
import { ChevronDown } from "lucide-react";

export function UiComboBox<T>({
  className,
  title,
  options,
  placeholder,
  getOptionLabel,
  selectedOption,
  selectedOnChange
} : {
  className?: string;
  title?: string;
  placeholder?: string;
  options?: T[];
  selectedOption?: string;
  getOptionLabel: (option: T) => string;
  selectedOnChange?: (option?: string) => void;
}) {
  const query = useStateObject('')

  const filteredOptions =
    query.value === ''
      ? options
      : _.filter(options, (option) => {
          return getOptionLabel(option).toLowerCase().includes(query.value.toLowerCase())
        })

  return (
    <div className={clsx(className, styles['combobox'])}>
      {title && <label>{title}</label>}
      <Combobox value={selectedOption} onChange={selectedOnChange}>
        <div>
        <UiBorderBox className={styles['select']}>
          <UiBgContainer className={styles['select-container']} color="opaque">
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
        <Combobox.Options className={styles['options']}>
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