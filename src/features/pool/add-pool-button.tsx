import { PlusIcon } from "@/shared/assets/svg";
import { UiButton, UiDialog } from "@/shared/ui";

export function AddPoolButton({
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
      renderTitle={() => "Add Pool"}
      renderBody={(onClose) => renderPoolForm(onClose)}
    />
  );
}