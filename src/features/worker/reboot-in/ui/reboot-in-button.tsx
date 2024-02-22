import { UiButton } from "@/shared/ui/ui-button";

export function RebootInButton({
  className,
  workerId,
  workerIsOnline
} : {
  className?: string;
  workerId?: string;
  workerIsOnline?: boolean;
}) {
  return (
    <UiButton
      className={className}
      color="blue"
      withBorder
      isClickable={workerIsOnline ?? false}
    >
      <span>REBOOT IN 30s</span>
    </UiButton>
  )
}