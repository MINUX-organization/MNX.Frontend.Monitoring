import { EditIcon } from "@/shared/assets/svg";
import { UiDialog } from "@/shared/ui";
import { IconButton } from "@chakra-ui/react";

export function EditAlgorithmButton({
  renderAlgorithmForm
} : {
  renderAlgorithmForm: (onClose: () => void) => React.ReactNode
}) {
  return (
    <UiDialog
      renderTrigger={() => (
        <IconButton variant="ghost" className='group' aria-label="Edit algorithm">
          <EditIcon />
        </IconButton>
      )}
      renderTitle={() => "Edit Pool"}
      renderBody={(onClose) => renderAlgorithmForm(onClose)}
    />
  )
}