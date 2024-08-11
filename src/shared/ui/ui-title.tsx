import clsx from "clsx";
import styles from './styles/uiTitle.module.scss';

export function UiTitle({
  className,
  label,
} : {
  className?: string;
  label: string;
}) {
  return (
    <div className={clsx(
      className,
      styles['title']
    )}>
      <div className={styles['line']}/>
      <span>{label}</span>
      <div className={styles['line']}/>
    </div>
  )
}