import { RegistrationForm } from "@/features/auth";
import { Box, Center } from "@chakra-ui/react";

export function RegistrationPage() {
  return (
    <Center minH={"100vh"} padding={4}>
      <Box maxW={"xs"} w={"full"}>
        <RegistrationForm />
      </Box>
    </Center>
  )
}