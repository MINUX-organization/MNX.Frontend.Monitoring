import clsx from "clsx";
import styles from './styles/uiMultiRadioButtons.module.scss'
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";

export function UiMultiRadioButtons({
  className
} : {
  className: string;

}) {
  return (
    <div className={clsx(
      className,
      styles['multi-radio-buttons']
    )}>
      <UiBorderBox>
        <UiBgContainer color="opaque">
          
        </UiBgContainer>
      </UiBorderBox>
    </div>
  )
}