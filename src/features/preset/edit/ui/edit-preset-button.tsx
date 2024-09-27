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
} : {
  className?: string;
  presetId: string;
  isIcon?: boolean;
  isActive?: boolean;
  isNavigate?: boolean;
}) {
  const navigate = useNavigate();

  const handle = () => {
    if (isNavigate) {
      navigate(`config?presetId=${presetId}`)
      return;
    }
    
    navigate(`?presetId=${presetId}`)
  }

  return (
    <button onClick={handle} className={clsx(!isIcon && styles['edit-preset-button'], className)}>
      <Pencil color={isActive ? '#EC790F' : 'white'} width={30} />
    </button>
  )
}