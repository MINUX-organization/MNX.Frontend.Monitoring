import { cryptocurrencyRepository } from "@/entities/cryptocurrency";
import { TrashIcon } from "@/shared/assets/svg";
import { UiTooltip } from "@/shared/ui";
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
    <UiTooltip content="Delete cryptocurrency">
      <IconButton variant="ghost" className='group' aria-label="Delete cryptocurrency" onClick={handleClick}>
        <TrashIcon {...props} />
      </IconButton>
    </UiTooltip>
  ) 
}