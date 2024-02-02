import _ from "lodash";
import styles from './gridLayout.module.scss'
import { ElementSlot } from "../model/types";
import clsx from "clsx";

export function GridLayout({
  className,
  slots
} : {
  className?: string;
  slots?: ElementSlot[];
}) {
  return (
    <div className={clsx(
      className,
      styles['wrapper']
    )}>
      {_.map(slots, (elementSlot) => (
        <div className={clsx(
          elementSlot.slot && styles[elementSlot.slot]
        )}>
          {...elementSlot.components}
        </div>
      ))}
    </div>
  )
}