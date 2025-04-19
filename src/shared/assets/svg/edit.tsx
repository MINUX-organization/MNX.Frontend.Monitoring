import { chakra } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";

export const EditIcon = chakra(MdEdit, {
  base: {
    _hover: {
      color: 'minux.solid'
    },
    _groupHover:{ 
      color: 'minux.solid' 
    },
    transition: 'all 0.2s ease-in-out'
  }
});