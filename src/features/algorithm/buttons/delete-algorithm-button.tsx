import { algorithmRepository } from "@/entities/algorithm";
import { TrashIcon } from "@/shared/assets/svg";
import { UiTooltip } from "@/shared/ui";
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
    <UiTooltip content='Delete algorithm'>
      <IconButton variant="ghost" className='group' aria-label="Delete algorithm" onClick={handleClick}>
        <TrashIcon {...props} />
      </IconButton>
    </UiTooltip>
  )
}