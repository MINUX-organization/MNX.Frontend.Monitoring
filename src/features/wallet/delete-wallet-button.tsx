import { walletRepository } from "@/entities/wallet";
import { TrashIcon } from "@/shared/assets/svg";
import { UiTooltip } from "@/shared/ui";
import { IconButton } from "@chakra-ui/react";
import { IconBaseProps } from "react-icons/lib";

const { useWalletMutation } = walletRepository;

interface DeletePoolButtonProps extends IconBaseProps {
  id: string;
}

export function DeleteWalletButton({id, ...props}: DeletePoolButtonProps) {
  const { deleteWallet } = useWalletMutation();

  const handleClick = async () => {
    await deleteWallet(id);
  }

  return (
    <UiTooltip content='Delete pool'>
      <IconButton variant="ghost" className='group' aria-label="Delete pool" onClick={handleClick}>
        <TrashIcon {...props} />
      </IconButton>
    </UiTooltip>
  ) 
}