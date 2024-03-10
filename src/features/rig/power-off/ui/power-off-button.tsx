import { UiButton } from "@/shared/ui/ui-button";

export function PowerOffButton({
  className,
  rigId,
  rigIsOnline
} : {
  className?: string;
  rigId?: string;
  rigIsOnline?: boolean;
}) {
  return (
    <UiButton
      className={className}
      color="red"
      withBorder
      isClickable={rigIsOnline ?? false}
    >
      <span>POWER OFF</span>
    </UiButton>
  )
}