import { Switch as ChakraSwitch } from "@chakra-ui/react"
import * as React from "react"

export interface SwitchProps extends ChakraSwitch.RootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  rootRef?: React.Ref<HTMLLabelElement>
  trackLabel?: { on: React.ReactNode; off: React.ReactNode }
  thumbLabel?: { on: React.ReactNode; off: React.ReactNode }
  controlprops?: ChakraSwitch.ControlProps
}

export const UiSwitch = React.forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(props, ref) {
    const { inputProps, children, rootRef, trackLabel, thumbLabel, controlprops, ...rest } =
      props

    return (
      <ChakraSwitch.Root ref={rootRef} {...rest} colorPalette={'accept'}>
        <ChakraSwitch.HiddenInput ref={ref} {...inputProps} />
        <ChakraSwitch.Control border={'1px solid'} borderColor={'minux.solid'} alignItems={'center'} {...controlprops}>
          <ChakraSwitch.Thumb>
            {thumbLabel && (
              <ChakraSwitch.ThumbIndicator fallback={thumbLabel?.off}>
                {thumbLabel?.on}
              </ChakraSwitch.ThumbIndicator>
            )}
          </ChakraSwitch.Thumb>
          {trackLabel && (
            <ChakraSwitch.Indicator fallback={trackLabel.off}>
              {trackLabel.on}
            </ChakraSwitch.Indicator>
          )}
        </ChakraSwitch.Control>
        {children != null && (
          <ChakraSwitch.Label>{children}</ChakraSwitch.Label>
        )}
      </ChakraSwitch.Root>
    )
  },
)
