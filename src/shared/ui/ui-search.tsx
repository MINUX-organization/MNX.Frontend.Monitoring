import styles from './styles/uiSearch.module.scss';
import clsx from "clsx";
import { ChangeEvent } from "react";
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";
import { Search } from "lucide-react";

export function UiSearch({
  className,
  onChange
} : {
  className: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <UiBorderBox className={clsx(className, styles['filter'])}>
      <UiBgContainer color={"opaque"} className={styles['filter-container']}>
        <Search className={styles['filter-icon']} size={24}/>
        <input type="text" className={styles['filter-input']} onChange={onChange}/>
      </UiBgContainer>
    </UiBorderBox>
  )
}

