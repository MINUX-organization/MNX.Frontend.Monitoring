import clsx from "clsx";
import styles from './onOpen.module.scss';
import { ChevronDown } from "lucide-react";
import { Dispatch } from "react";

export function OnOpen({ 
  className,
  setIsOpen
} : {
  className?: string;
  setIsOpen?: Dispatch<React.SetStateAction<boolean>>;
}) {
  const onOpen = () => setIsOpen && setIsOpen((prev) => !prev)

  return (
    <button className={clsx(
      className,
      styles['on-open']
    )}>
      <ChevronDown size={30} onClick={onOpen} />
    </button>
  )
}