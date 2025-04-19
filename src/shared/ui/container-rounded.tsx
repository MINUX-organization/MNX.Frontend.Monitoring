import { chakra } from "@chakra-ui/react";

export const UiContainerRounded = chakra('div', {
  base: {
    rounded: 'md',
    bg: 'bg.subtle',
    border: '1px solid',
    borderColor: 'minux.solid',
    shadow: 'md',
    p: '6'
  }
})