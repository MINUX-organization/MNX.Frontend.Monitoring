import { PlusIcon } from "@/shared/assets/svg";
import { UiButton, UiDialog } from "@/shared/ui";

export function AddAlgorithmButton({
  renderAlgorithmForm
} : {
  renderAlgorithmForm: (onClose: () => void) => React.ReactNode
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
      renderTitle={() => "Add Custom Algorithm"}
      renderBody={(onClose) => renderAlgorithmForm(onClose)}
    />
  )
}