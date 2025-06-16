import { EditIcon } from "@/shared/assets/svg";
import { UiDialog, UiTooltip } from "@/shared/ui";
import { Box, IconButton } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface EditCustomMinerButtonProps {
  renderMinerForm: (onClose?: () => void) => ReactNode
}

export const EditCustomMinerButton: FC<EditCustomMinerButtonProps> = ({ renderMinerForm }) => {

  return (
    <UiDialog 
      renderTrigger={() => (
        <Box>
          <UiTooltip content="Edit algorithm">
            <IconButton variant="ghost" className='group' aria-label="Edit Custom Miner">
              <EditIcon />
            </IconButton>
          </UiTooltip>
        </Box>
      )}
      renderTitle={() => "Edit Custom Miner"}
      renderBody={(onClose) => renderMinerForm(onClose)}
    />
  );
};