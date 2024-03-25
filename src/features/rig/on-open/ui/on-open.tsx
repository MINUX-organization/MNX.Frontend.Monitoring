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
    <ChevronDown width={30} className={className} onClick={onOpen} />
  )
}