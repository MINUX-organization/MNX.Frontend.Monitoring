import clsx from "clsx"
import { Check } from "lucide-react"
import styles from './apply-preset-button.module.scss'
import { useNavigate } from "react-router";

export function ApplyPresetButton({
  className,
  presetId,
  isIcon,
} : {
  className?: string;
  presetId?: string;
  isIcon?: boolean;
}) {
  const navigate = useNavigate();

  const handle = () => {
    if (!presetId) return;

    navigate(presetId)
  }

  return (
    <button onClick={handle} className={clsx(!isIcon && styles['apply-preset-button'], className)}>
      <Check width={30} />
    </button>
  )
}