import { chakra } from "@chakra-ui/react";
import { FaRegCheckCircle } from "react-icons/fa";

export const ConfirmedIcon = chakra(FaRegCheckCircle, {
  base: {
    _groupHover:{ 
      color: 'green.500' 
    },
    _groupDisabled: {
      color: 'inherit'
    },
    transition: 'all 0.2s ease-in-out'
  }
});