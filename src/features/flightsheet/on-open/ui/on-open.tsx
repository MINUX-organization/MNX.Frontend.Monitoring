import clsx from "clsx";
import styles from './onOpen.module.scss';
import { ChevronDown } from "lucide-react";
import { StateObject } from "@/shared/lib/utils/state-object";

export function OnOpen({ 
  className,
  isOpen
} : {
  className?: string;
  isOpen?: StateObject<boolean>;
}) {
  const onOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    isOpen && isOpen.setValue((prev) => !prev)
  }
  
  return (
    <button className={clsx(
        className,
        styles['on-open']
      )}

    >
      <ChevronDown 
        className={clsx(isOpen?.value && styles['invert'])} 
        size={30} 
        onClick={onOpen} 
      />
    </button>
  )
}