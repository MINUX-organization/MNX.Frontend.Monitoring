import { LoginForm } from "@/features/auth";
import { Box, Center } from "@chakra-ui/react";

export function LoginPage() {
  return (
    <Center minH={"100vh"} padding={4}>
      <Box maxW={"xs"} w={"full"}>
        <LoginForm />
      </Box>
    </Center>
  )
} 