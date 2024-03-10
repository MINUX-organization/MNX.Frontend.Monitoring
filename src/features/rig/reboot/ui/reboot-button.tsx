import { UiButton } from "@/shared/ui/ui-button";

export function RebootButton({
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
      color="blue"
      withBorder
      isClickable={rigIsOnline ?? false}
    >
      <span>REBOOT</span>
    </UiButton>
  )
}