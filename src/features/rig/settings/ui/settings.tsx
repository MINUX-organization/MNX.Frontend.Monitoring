import clsx from "clsx";
import styles from './settings.module.scss'
import { SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom"

export function Settings({ 
  className,
  index
} : { 
  className?: string;
  index: number;
}) {
  return (
    <Link to={index.toString()} className={clsx(
      className,
      styles['settings']
    )}>
      <SettingsIcon size={30}/>
    </Link>
  )
}