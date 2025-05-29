import { minerRepository } from "@/entities/miner";
import { TrashIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { IconBaseProps } from "react-icons/lib";

const { useMinerMutation } = minerRepository;

interface DeleteCustomMinerButtonProps extends IconBaseProps {
  id: string;
}

export function DeleteCustomMinerButton({id, ...props}: DeleteCustomMinerButtonProps) {
  const { deleteCustomMiner } = useMinerMutation();

  const handleClick = () => deleteCustomMiner(id);

  return (
    <IconButton variant="ghost" className='group' aria-label="Delete algorithm" onClick={handleClick}>
      <TrashIcon {...props} />
    </IconButton>
  )
}