import { UiButton } from "@/shared/ui/ui-button";

export function CreateFlightSheetButton({
  className
} : {
  className?: string
}) {
  return (
    <UiButton className={className} color="blue" withBorder>
      <span>Create Flight Sheet</span>
    </UiButton>
  )
}