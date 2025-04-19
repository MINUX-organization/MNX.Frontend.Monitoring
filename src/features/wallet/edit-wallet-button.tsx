import { EditIcon } from "@/shared/assets/svg";
import { UiDialog } from "@/shared/ui";
import { IconButton } from "@chakra-ui/react";

export function EditWalletButton({
  renderPoolForm
} : {
  renderPoolForm: (onClose: () => void) => React.ReactNode
}) {
  return (
    <UiDialog
      renderTrigger={() => (
        <IconButton variant="ghost" className='group' aria-label="Edit wallet">
          <EditIcon />
        </IconButton>
      )}
      renderTitle={() => "Edit Wallet"}
      renderBody={(onClose) => renderPoolForm(onClose)}
    />
  );
}