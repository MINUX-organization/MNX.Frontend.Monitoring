import { UiButton } from "@/shared/ui/ui-button";

export function PowerOffButton({
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
      color="red"
      withBorder
      isClickable={workerIsOnline ?? false}
    >
      <span>POWER OFF</span>
    </UiButton>
  )
}