import { poolRepository } from "@/entities/pool";
import { TrashIcon } from "@/shared/assets/svg";
import { UiTooltip } from "@/shared/ui";
import { IconButton } from "@chakra-ui/react";
import { IconBaseProps } from "react-icons/lib";

const { usePoolMutation } = poolRepository;

interface DeletePoolButtonProps extends IconBaseProps {
  id: string;
}

export function DeletePoolButton({id, ...props}: DeletePoolButtonProps) {
  const { deletePool } = usePoolMutation();

  const handleClick = async () => {
    await deletePool(id);
  }

  return (
    <UiTooltip content='Delete pool'>
      <IconButton variant="ghost" className='group' aria-label="Delete pool" onClick={handleClick}>
        <TrashIcon {...props} />
      </IconButton>
    </UiTooltip>
  ) 
}