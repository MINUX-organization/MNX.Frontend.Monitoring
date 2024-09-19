import clsx from "clsx";
import { Pencil } from "lucide-react";
import styles from './edit-preset-button.module.scss';

export function EditPresetButton({
  className
} : {
  className?: string;
}) {
  return (
    <button className={clsx(styles['edit-preset-button'], className)}>
      <Pencil width={30} />
    </button>
  )
}