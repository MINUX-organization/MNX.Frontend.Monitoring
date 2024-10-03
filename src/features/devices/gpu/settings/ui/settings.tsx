import clsx from "clsx";
import styles from './settings.module.scss'
import { SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Settings({ 
  className,
  gpuId
} : { 
  className?: string;
  gpuId: string;
}) {
  const navigate = useNavigate();

  const handle = () => {
    navigate(`overclock?gpuId=${gpuId}`)
  }

  return (
    <button onClick={handle} className={clsx(
      className,
      styles['settings']
    )}>
      <SettingsIcon size={30}/>
    </button>
  )
}