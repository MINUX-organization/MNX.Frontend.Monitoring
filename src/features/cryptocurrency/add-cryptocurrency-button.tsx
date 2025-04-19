import { PlusIcon } from "@/shared/assets/svg";
import { UiButton, UiDialog } from "@/shared/ui";

export function AddCryptocurrencyButton({
  renderCryptocurrencyForm
} : {
  renderCryptocurrencyForm: (onClose: () => void) => React.ReactNode
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
      renderTitle={() => "Add Cryptocurrency"}
      renderBody={(onClose) => renderCryptocurrencyForm(onClose)}
    />
  );
}