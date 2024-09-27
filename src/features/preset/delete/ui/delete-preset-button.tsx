import clsx from "clsx";
import { Trash2 } from "lucide-react";
import styles from './delete-preset-button.module.scss';
import { usePresetRepository } from "@/entities/preset";

export function DeletePresetButton({
  className,
  presetId,
  isIcon,
} : {
  className?: string;
  presetId: string;
  isIcon?: boolean;
}) {
  const { deletePreset } = usePresetRepository()
  
  const handler = () => {
    deletePreset(presetId);
  }

  return (
    <button 
      className={clsx(!isIcon && styles['delete-preset-button'], className)}
      onClick={handler}  
    >
      <Trash2 width={30} />
    </button>
  )
}