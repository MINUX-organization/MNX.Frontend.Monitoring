import { PlusIcon } from "@/shared/assets/svg";
import { UiButton, UiDialog, UiTooltip } from "@/shared/ui";

export function AddWalletButton({
  renderPoolForm
} : {
  renderPoolForm: (onClose: () => void) => React.ReactNode
}) {
  return (
    <UiDialog
      renderTrigger={() => (
        <UiButton
          colorPalette={'accept'}
        >
          Add <PlusIcon />
        </UiButton>
      )}
      renderTitle={() => "Add Wallet"}
      renderBody={(onClose) => renderPoolForm(onClose)}
    />
  );
}