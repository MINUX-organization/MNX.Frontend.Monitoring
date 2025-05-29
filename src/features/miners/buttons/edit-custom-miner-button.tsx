import { EditIcon } from "@/shared/assets/svg";
import { UiDialog } from "@/shared/ui";
import { IconButton } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface EditCustomMinerButtonProps {
  renderMinerForm: (onClose?: () => void) => ReactNode
}

export const EditCustomMinerButton: FC<EditCustomMinerButtonProps> = ({ renderMinerForm }) => {

  return (
    <UiDialog 
      renderTrigger={() => (
        <IconButton variant="ghost" className='group' aria-label="Edit Custom Miner">
          <EditIcon />
        </IconButton>
      )}
      renderTitle={() => "Edit Custom Miner"}
      renderBody={(onClose) => renderMinerForm(onClose)}
    />
  );
};