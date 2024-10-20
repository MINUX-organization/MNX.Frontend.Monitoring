import clsx from "clsx";
import { ChangeEvent } from "react";
import { Search } from "lucide-react";
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";
import styles from './styles/uiSearch.module.scss';
import { useStateObject } from '../lib/utils/state-object';

export function UiSearch({
  className,
  onChange,
  placeholder
} : {
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  const query = useStateObject('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    query.setValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };
    
  return (
    <UiBorderBox className={clsx(className, styles['search'])}>
      <UiBgContainer color={"opaque"} className={styles['search-container']}>
        <Search className={styles['search-icon']} size={20}/>
        <input 
          autoComplete="off"
          className={styles['search-input']} 
          type='text' 
          placeholder={placeholder}
          value={query.value}
          onChange={handleInputChange}/>
      </UiBgContainer>
    </UiBorderBox>
  )
}

