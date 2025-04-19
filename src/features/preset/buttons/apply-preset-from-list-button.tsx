import { UiButton, UiDialog } from "@/shared/ui";

export function ApplyPresetFromListButton({
  renderPresetsList
} : {
  renderPresetsList?: () => React.ReactNode
}) {
  return (
    <UiDialog 
      lazyMount
      renderTrigger={() => (
        <UiButton colorPalette={'accept'}>
          Apply preset
        </UiButton>
      )}
      renderTitle={() => "Apply preset"}
      renderBody={() => renderPresetsList?.()}
    />
  )
}