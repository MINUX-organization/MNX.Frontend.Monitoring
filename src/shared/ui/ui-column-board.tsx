import { UiTextTitleWrapper } from "./ui-text-title-wrapper";
import styles from './styles/uiColumnBoard.module.scss';
import clsx from "clsx";
import _ from "lodash";

type Field = {
  label: string;
  value: string | number | boolean | JSX.Element;
  measureUnit?: string;
} 

export function UiColumnBoard({
  className,
  title,
  data,
  isFlex,
  sep
} : {
  className?: string;
  title?: string;
  isFlex?: boolean;
  sep?: string;
  data: Field[];
}) {
  return (
    <div className={clsx(
        className,
        styles['column-board']
      )}
    > 
      {title && <UiTextTitleWrapper text={title} />}
      {_.map(data, (d) => (
        <div key={d.label} className={clsx(
          styles['item'],
          isFlex && styles['flex']
        )}>
          <span className={styles['label']}>{d.label}</span>
          <span className={styles['sep']}>{sep}</span>
          <span className={styles['value']}>{d.value}&nbsp;
            <span className={styles['measure']}>{d.measureUnit}</span>
          </span>
        </div>
      ))}
    </div>
  )
}