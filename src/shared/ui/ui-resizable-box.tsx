import { ReactNode, useEffect, useRef } from "react";
import { useStateObject } from "../lib/utils/state-object";
import clsx from "clsx";
import styles from './styles/uiResizableBox.module.scss';

export function UiResizableBox({
  className,
  children,
  trigger
} : {
  className?: string;
  children?: ReactNode;
  trigger: boolean;
}) {
  const height = useStateObject<string | number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (contentRef.current) {
      height.setValue(trigger ? contentRef.current.scrollHeight : 0);
    }
  }, [trigger]);

  return (
    <div
      className={clsx(className, styles['resizable-box'])} 
      ref={contentRef} 
      style={{ height: height.value }}>
      {children}
    </div>
  )
}