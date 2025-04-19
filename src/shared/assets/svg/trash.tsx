import { FaRegTrashAlt } from "react-icons/fa";
import { chakra } from "@chakra-ui/react";

export const TrashIcon = chakra(FaRegTrashAlt, {
  base: {
    _hover: {
      color: 'red.500'
    },
    _groupHover:{ 
      color: 'red.500' 
    },
    transition: 'all 0.2s ease-in-out'
  }
});