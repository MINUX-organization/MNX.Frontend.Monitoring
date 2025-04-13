import { Center, Heading, Link } from "@chakra-ui/react";
import { ErrorComponentProps } from "@tanstack/react-router";

export function ErrorPage({ ...props }: ErrorComponentProps) {
  return (
    <Center h={"full"} display={"flex"} flexDirection={"column"}>
      <Heading>The page cannot be displayed due to an error: {props.error.name}</Heading>
      <Link textStyle={'lg'} onClick={() => props.reset()}>Retry</Link>
    </Center>
  )
}