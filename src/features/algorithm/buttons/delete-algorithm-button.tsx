import { algorithmRepository } from "@/entities/algorithm";
import { TrashIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { IconBaseProps } from "react-icons/lib";

const { useAlgorithmMutation } = algorithmRepository;

interface DeleteAlgorithmButtonProps extends IconBaseProps {
  id: string;
}

export function DeleteAlgorithmButton({id, ...props}: DeleteAlgorithmButtonProps) {
  const { deleteAlgorithm } = useAlgorithmMutation();

  const handleClick = () => deleteAlgorithm(id);

  return (
    <IconButton variant="ghost" className='group' aria-label="Delete algorithm" onClick={handleClick}>
      <TrashIcon {...props} />
    </IconButton>
  )
}