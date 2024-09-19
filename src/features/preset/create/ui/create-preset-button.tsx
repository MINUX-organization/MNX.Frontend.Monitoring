import { UiButton } from "@/shared/ui/ui-button";

export function CreatePresetButton({
  className
} : {
  className?: string
}) {
  return (
    <UiButton className={className} color="blue" withBorder>
      <span>&#43; Create Preset</span>
    </UiButton>
  )
}