import { UiButton } from "@/shared/ui/ui-button";

export function RebootInButton({
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
      <span>REBOOT IN 30s</span>
    </UiButton>
  )
}