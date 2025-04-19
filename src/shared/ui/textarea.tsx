import { Textarea, TextareaProps } from "@chakra-ui/react";

export function UiTextarea({ ...props }: TextareaProps) {
  return (
    <Textarea
      colorPalette="input"
      minH={'5rem'}
      bg="bg.input"
      borderColor="minux.solid"
      rounded="md"
      textStyle={'md'}
      _focusVisible={{ borderColor: "orange", focusRingColor: "transparent" }}
      _invalid={{ borderColor: "red.500", focusRingColor: "transparent" }}
      _peerInvalid={{ borderColor: "red.500", focusRingColor: "transparent" }}
      {...props}
    />
  )
}