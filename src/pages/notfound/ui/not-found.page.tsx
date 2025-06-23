import { FC } from "react";
import { Center, Box, Text, Flex } from "@chakra-ui/react";

export const NotFoundPage: FC = () => {
  return (
    <Center h="100vh">
      <Flex align="center">
        <Text fontWeight="bold" fontSize="4xl" mr={4}>
          404
        </Text>
        <Box
          h="40px"
          borderLeft="2px solid"
          borderColor="gray.300"
          mx={4}
        />
        <Text fontSize="2xl">Not Found</Text>
      </Flex>
    </Center>
  );
};
