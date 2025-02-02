import { chakra, Input } from "@chakra-ui/react";

export const UiInput = chakra(Input, {
  base: {
    bg: 'bg.panel',
    borderColor: 'minux.solid',
  }
})