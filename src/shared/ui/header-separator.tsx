import { HStack, Separator, TextProps } from "@chakra-ui/react";
import { UiText } from "./text";

export interface HeaderSeparatorProps extends TextProps {
  label: string;
}

export function HeaderSeparator({ label, ...props }: HeaderSeparatorProps) {
  return (
    <HStack>
      <Separator orientation="horizontal" flex={1} borderColor={'minux.solid'}/>
      <UiText textStyle={'xl'} ml={1} mr={1} {...props}>{label}</UiText>
      <Separator orientation="horizontal" flex={1} borderColor={'minux.solid'}/>
    </HStack>
  )
}