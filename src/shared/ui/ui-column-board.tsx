import { UiTextTitleWrapper } from "./ui-text-title-wrapper";
import styles from './styles/uiColumnBoard.module.scss';
import clsx from "clsx";
import _ from "lodash";

type Field = {
  label: string;
  value: string | number;
} 

export function UiColumnBoard({
  className,
  title,
  data,
  sep
} : {
  className?: string;
  title: string;
  sep?: string;
  data: Field[];
}) {
  return (
    <div className={clsx(className, styles['column-board'])}> 
      <UiTextTitleWrapper text={title} />
      {_.map(data, (d) => (
        <div key={d.label} className={styles['item']}>
          <span className={styles['label']}>{d.label}</span>
          <span className={styles['sep']}>{sep}</span>
          <span className={styles['value']}>{d.value}</span>
        </div>
      ))}
    </div>
  )
}