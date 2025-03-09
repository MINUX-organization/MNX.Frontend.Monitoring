import { Heading, HStack, Separator } from "@chakra-ui/react";

export function HeaderSeparator({
  label
} : {
  label: string;
}) {
  return (
    <HStack>
      <Separator orientation="horizontal" flex={1} borderColor={'minux.solid'}/>
      <Heading ml={1} mr={1}>{label}</Heading>
      <Separator orientation="horizontal" flex={1} borderColor={'minux.solid'}/>
    </HStack>
  )
}