import { EditIcon } from "@/shared/assets/svg";
import { UiDialog, UiTooltip } from "@/shared/ui";
import { Box, IconButton } from "@chakra-ui/react";

export function EditAlgorithmButton({
  renderAlgorithmForm
} : {
  renderAlgorithmForm: (onClose: () => void) => React.ReactNode
}) {
  return (
    <UiDialog
      renderTrigger={() => (
        <Box>
          <UiTooltip content='Edit algorithm'>
            <IconButton variant="ghost" className='group' aria-label="Edit algorithm">
              <EditIcon />
            </IconButton>
          </UiTooltip>
        </Box>
      )}
      renderTitle={() => "Edit Pool"}
      renderBody={(onClose) => renderAlgorithmForm(onClose)}
    />
  )
}