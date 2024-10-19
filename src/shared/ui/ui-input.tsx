import clsx from "clsx";
import styles from './styles/uiInput.module.scss'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";

type UiInputProps<T extends FieldValues> = {
  color?: 'opaque' | 'opaqueBlack' | 'transparent';
  label?: string;
  className?: string;
  placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement> & UseControllerProps<T> 

export function UiInput<T extends FieldValues>({
  label, 
  className,
  color,
  placeholder,
  ...props
} : UiInputProps<T>) {
  const { field } = useController(props);
  
  return (
    <div className={clsx(className, styles['input'])} {...props}>
      <label>{label}</label>
      <UiBorderBox className={clsx(styles['input-container'], props.disabled && styles['disabled'])}>
        <UiBgContainer className={styles['padding-flex']} color={color ?? 'opaque'}>
          <input 
            {...field} 
            className={styles['padding-input']}
            autoComplete="off"
            type={props.type} 
            placeholder={placeholder}/>
        </UiBgContainer>
      </UiBorderBox>
    </div>
  )
}