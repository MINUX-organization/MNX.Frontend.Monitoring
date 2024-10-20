import clsx from "clsx";
import styles from './styles/uiTextarea.module.scss'
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";

export type UiTextAreaProps<T extends FieldValues> = React.InputHTMLAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement> & UseControllerProps<T>;

export function UiTextArea<T extends FieldValues>({
  className,
  color,
  placeholder,
  label,
  ...props
} : {
  color?: 'opaque' | 'opaqueBlack' | 'transparent';
  className?: string;
  placeholder?: string;
  label?: string;
} & UiTextAreaProps<T>) {
  const { field } = useController(props);
  
  return (
    <div className={clsx(className, styles['textarea'])} {...props}>
      <label>{label}</label>
      <UiBorderBox className={clsx(styles['input-container'], props.disabled && styles['disabled'])}>
        <UiBgContainer className={styles['padding-flex']} color={color ?? 'opaque'}>
          <textarea placeholder={placeholder} className={styles['textarea-input']} {...field} autoComplete="off" disabled={props.disabled}/>
        </UiBgContainer>
      </UiBorderBox>
    </div>
  )
}