import { ReactNode, RefAttributes, useEffect, useRef, useState } from "react";
// import clsx from "clsx";
// import styles from './styles/uiResizableBox.module.scss';
import AnimateHeight, { Height } from "react-animate-height";

export function UiResizableBox({
  children,
  trigger = true,
  ...props
} : {
  className?: string;
  children?: ReactNode;
  trigger?: boolean;
} & RefAttributes<HTMLDivElement>) {
  const [height, setHeight] = useState<Height>(0);
  const contentDiv = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const element = contentDiv.current as HTMLDivElement;

    if (!trigger) { 
      setHeight(0); 
      return; 
    }

    const resizeObserver = new ResizeObserver(() => {

      setHeight(element.clientHeight);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [trigger]);

  return (
    <AnimateHeight
      {...props}
      height={height}
      contentRef={contentDiv}
      duration={500}
      disableDisplayNone
    >
      {children}
    </AnimateHeight>
  );
}