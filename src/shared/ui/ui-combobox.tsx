import { Combobox } from "@headlessui/react"
import { useStateObject } from "../lib/utils/state-object";
import styles from './styles/uiCombobox.module.scss';
import clsx from "clsx";
import _ from "lodash";

export function UiComboBox<T>({
  className,
  title,
  options,
  placeholder,
  getOptionLabel,
  selectedOnChange
} : {
  className?: string;
  title?: string;
  placeholder?: string;
  options: T[];
  getOptionLabel: (option?: T) => string;
  selectedOnChange: (option?: T | string) => void;
}) {
  const query = useStateObject('')
  const selectedOption = useStateObject('')

  const filteredOptions =
    query.value === ''
      ? options
      : _.filter(options, (option) => {
          return getOptionLabel(option).toLowerCase().includes(query.value.toLowerCase())
        })

  return (
    <div className={clsx(className, styles['combobox'])}>
      {title && <label>{title}</label>}
      <Combobox value={selectedOption.value} onChange={selectedOnChange}>
        <Combobox.Input placeholder={placeholder} onChange={(event) => query.setValue(event.target.value)} />
        <Combobox.Options>
          {_.map(filteredOptions, (option) => (
            <Combobox.Option key={getOptionLabel?.(option)} value={getOptionLabel?.(option)}>
              {getOptionLabel?.(option)}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  )
}