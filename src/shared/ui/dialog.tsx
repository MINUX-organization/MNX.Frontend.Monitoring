import { Dialog as ChakraDialog, DialogContext, Portal } from "@chakra-ui/react"
import { CloseButton } from "./close-button"
import * as React from "react"
import { match } from "ts-pattern"

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  backdrop?: boolean
}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(function DialogContent(props, ref) {
  const {
    children,
    portalled = true,
    portalRef,
    backdrop = true,
    ...rest
  } = props

  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && <ChakraDialog.Backdrop />}
      <ChakraDialog.Positioner>
        <ChakraDialog.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDialog.Content>
      </ChakraDialog.Positioner>
    </Portal>
  )
})

export const DialogCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraDialog.CloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  return (
    <ChakraDialog.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref}>
        {props.children}
      </CloseButton>
    </ChakraDialog.CloseTrigger>
  )
})

export interface DialogProps extends Omit<ChakraDialog.RootProps, "children"> {
  children?: React.ReactNode
  renderBody?: (onClose: () => void) => React.ReactNode
  renderTitle?: () => React.ReactNode
  renderTrigger?: () => React.ReactNode
  renderFooter?: () => React.ReactNode
}

export function UiDialog({ renderBody, renderTitle, renderTrigger, renderFooter, ...props }: DialogProps) {
  const currentFocusRef = React.useRef<HTMLButtonElement>(null)
  return (
    <DialogRoot 
      motionPreset={'slide-in-bottom'} 
      placement={'center'}
      closeOnInteractOutside={false}
      modal={false} 
      scrollBehavior={'inside'}
      initialFocusEl={() => currentFocusRef.current}
      {...props} 
    >
      <DialogTrigger asChild>{renderTrigger?.()}</DialogTrigger>
      <DialogContent>
      {match(renderTitle)
        .with(undefined, () => null)
        .otherwise(() => (
          <DialogHeader>
            <DialogTitle textAlign={"center"}>
              {renderTitle?.()}
            </DialogTitle>
          </DialogHeader>
        ))}
      {match(renderBody)
        .with(undefined, () => null)
        .otherwise(() => (
          <DialogContext>
            {(store) => (
              <DialogBody>
                {renderBody?.(() => store.setOpen(false))}
              </DialogBody>
            )}
          </DialogContext>
        ))}
      {match(renderFooter)
        .with(undefined, () => null)
        .otherwise(() => (
          <DialogFooter>
            {renderFooter?.()}
          </DialogFooter>
        ))}
        <DialogCloseTrigger ref={currentFocusRef}/>
      </DialogContent>
    </DialogRoot>
  )
}

export const DialogRoot = ChakraDialog.Root
export const DialogFooter = ChakraDialog.Footer
export const DialogHeader = ChakraDialog.Header
export const DialogBody = ChakraDialog.Body
export const DialogBackdrop = ChakraDialog.Backdrop
export const DialogTitle = ChakraDialog.Title
export const DialogDescription = ChakraDialog.Description
export const DialogTrigger = ChakraDialog.Trigger
export const DialogActionTrigger = ChakraDialog.ActionTrigger
