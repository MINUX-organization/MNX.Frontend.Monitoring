import { cryptocurrencyRepository } from "@/entities/cryptocurrency";
import { TrashIcon } from "@/shared/assets/svg";
import { IconButton } from "@chakra-ui/react";
import { IconBaseProps } from "react-icons/lib";

const { useCryptocurrencyMutation } = cryptocurrencyRepository;

interface DeleteCryptocurrencyButtonProps extends IconBaseProps {
  id: string;
}

export function DeleteCryptocurrencyButton({id, ...props}: DeleteCryptocurrencyButtonProps) {
  const { deleteCryptocurrency } = useCryptocurrencyMutation();

  const handleClick = async () => {
    await deleteCryptocurrency(id);
  }

  return (
    <IconButton variant="ghost" className='group' aria-label="Delete cryptocurrency">
      <TrashIcon {...props} onClick={handleClick}/>
    </IconButton>
  ) 
}