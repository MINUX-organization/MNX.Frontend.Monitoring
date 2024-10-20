import clsx from "clsx";
import { Pencil } from "lucide-react";
import styles from './edit-preset-button.module.scss';
import { useNavigate } from "react-router";

export function EditPresetButton({
  className,
  presetId,
  isIcon,
  isActive,
  isNavigate,
  onClick
} : {
  className?: string;
  presetId: string;
  isIcon?: boolean;
  isActive?: boolean;
  isNavigate?: boolean;
  onClick?: (e: React.MouseEvent) => void
}) {
  const navigate = useNavigate();

  const handle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    onClick?.(e)

    if (isNavigate) {
      navigate(`config?presetId=${presetId}`)
      return;
    }
    
    navigate(`?presetId=${presetId}`)
  }

  return (
    <button onClick={handle} className={clsx(!isIcon && styles['edit-preset-button'], className)}>
      <Pencil color={isActive ? '#EC790F' : 'white'} size={18} />
    </button>
  )
}