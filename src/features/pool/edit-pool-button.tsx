import { EditIcon } from "@/shared/assets/svg";
import { UiDialog, UiTooltip } from "@/shared/ui";
import { Box, IconButton } from "@chakra-ui/react";

export function EditPoolButton({
  renderPoolForm
} : {
  renderPoolForm: (onClose: () => void) => React.ReactNode
}) {
  return (
    <UiDialog
      renderTrigger={() => (
        <Box>
          <UiTooltip content='Edit pool'>
            <IconButton variant="ghost" className='group' aria-label="Edit pool">
              <EditIcon />
            </IconButton>
          </UiTooltip>
        </Box>

      )}
      renderTitle={() => "Edit Pool"}
      renderBody={(onClose) => renderPoolForm(onClose)}
    />
  );
}