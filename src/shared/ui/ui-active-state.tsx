import clsx from "clsx";
import styles from "./styles/uiActiveState.module.scss"
import { Circle } from "lucide-react";
import { match } from "ts-pattern";

export function UiActiveState({
  className,
  isActive
} : {
  className?: string;
  isActive?: boolean;
}) {
  const isActiveIcon = match(isActive)
    .with(true, () => <Circle className={clsx(className, styles['green'])} size={15}/>)
    .otherwise(() => <Circle className={clsx(className, styles['red'])} size={15}/>)

  return (
    isActiveIcon
  )
}