import clsx from "clsx";
import styles from './styles/uiTextTitleWrapper.module.scss';

export function UiTextTitleWrapper({ 
  className,
  text
} : {
  className?: string; 
  text: string;
}) {
  return (
    <div className={clsx(className, styles['text-title-wrapper'])}>
      {text}
    </div>
  )
}