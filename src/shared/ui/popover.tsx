import { Popover as ChakraPopover, PopoverOpenChangeDetails, Portal } from "@chakra-ui/react"
import { UiCloseButton } from "./close-button"
import * as React from "react"
import { match } from "ts-pattern"

interface PopoverContentProps extends ChakraPopover.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(function PopoverContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraPopover.Positioner>
        <ChakraPopover.Content ref={ref} {...rest} />
      </ChakraPopover.Positioner>
    </Portal>
  )
})

export const PopoverArrow = React.forwardRef<
  HTMLDivElement,
  ChakraPopover.ArrowProps
>(function PopoverArrow(props, ref) {
  return (
    <ChakraPopover.Arrow {...props} ref={ref}>
      <ChakraPopover.ArrowTip />
    </ChakraPopover.Arrow>
  )
})

export const PopoverCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraPopover.CloseTriggerProps
>(function PopoverCloseTrigger(props, ref) {
  return (
    <ChakraPopover.CloseTrigger
      position="absolute"
      top="1"
      insetEnd="1"
      {...props}
      asChild
      ref={ref}
    >
      <UiCloseButton size="sm" />
    </ChakraPopover.CloseTrigger>
  )
})

type ChildrenProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type ChildrenType = null | React.ReactNode | ((props: ChildrenProps) => React.ReactNode);

export interface PopoverProps extends Omit<ChakraPopover.RootProps, "children"> {
  contentprops?: ChakraPopover.ContentProps
  renderTrigger?: (open: boolean) => React.ReactNode
  disabled?: boolean;
  children?: ChildrenType;
  disableArrow?: boolean;
}

export function UiPopover({ 
  contentprops, 
  renderTrigger, 
  disabled, 
  children, 
  disableArrow, 
  ...props 
} : PopoverProps) {
  const [open, setOpen] = React.useState(false)

  const handleOpenChange = (e: PopoverOpenChangeDetails) => {
    if (disabled) return
    setOpen(e.open)
  }

  return (
    <PopoverRoot 
      {...props} 
      open={open} 
      onOpenChange={handleOpenChange} 
      positioning={{ placement: "top"}} 
      autoFocus={false}
    >
    <PopoverTrigger asChild>
      {renderTrigger?.(open)}     
    </PopoverTrigger>
    <PopoverContent {...contentprops} rounded={'md'}>
      {!disableArrow && <PopoverArrow />}
      <PopoverBody>
        {
          match(children)
            .with(null, () => <></>)
            .when((children) => typeof children === "object", (children) => children)
            .when((children) => typeof children === "function", (children) => children({ open, setOpen }))
            .otherwise(() => <></>)
        }
      </PopoverBody>
    </PopoverContent>
  </PopoverRoot>
  )
}

export const PopoverTitle = ChakraPopover.Title
export const PopoverDescription = ChakraPopover.Description
export const PopoverFooter = ChakraPopover.Footer
export const PopoverHeader = ChakraPopover.Header
export const PopoverRoot = ChakraPopover.Root
export const PopoverBody = ChakraPopover.Body
export const PopoverTrigger = ChakraPopover.Trigger
