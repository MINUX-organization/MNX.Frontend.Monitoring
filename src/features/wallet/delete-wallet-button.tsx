import { poolRepository } from "@/entities/pool";
import { TrashIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { IconBaseProps } from "react-icons/lib";

const { usePoolMutation } = poolRepository;

interface DeletePoolButtonProps extends IconBaseProps {
  id: string;
}

export function DeleteWalletButton({id, ...props}: DeletePoolButtonProps) {
  const { deletePool } = usePoolMutation();

  const handleClick = async () => {
    await deletePool(id);
  }

  return (
    <IconButton variant="ghost" className='group' aria-label="Delete pool">
      <TrashIcon {...props} onClick={handleClick}/>
    </IconButton>
  ) 
}