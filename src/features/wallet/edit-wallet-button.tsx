import { EditIcon } from "@/shared/assets/svg";
import { UiDialog, UiTooltip } from "@/shared/ui";
import { Box, IconButton } from "@chakra-ui/react";

export function EditWalletButton({
  renderPoolForm
} : {
  renderPoolForm: (onClose: () => void) => React.ReactNode
}) {
  return (
    
      <UiDialog
        renderTrigger={() => (
          <Box>
            <UiTooltip content='Edit wallet'>
              <IconButton variant="ghost" className='group' aria-label="Edit wallet">
                <EditIcon />
              </IconButton>
            </UiTooltip>
          </Box>
        )}
        renderTitle={() => "Edit Wallet"}
        renderBody={(onClose) => renderPoolForm(onClose)}
      />
    
  );
}