import { UiButton } from "@/shared/ui/ui-button";

export function StartStopMiningButton({
  className,
  workerId,
  workerIsActive,
  workerIsOnline
} : {
  className?: string;
  workerId?: string;
  workerIsActive?: boolean;
  workerIsOnline?: boolean;
}) {
  const text = workerIsActive ? 'STOP MINING' : 'START MINING'
  const color = workerIsActive ? 'red' : 'blue' 
  return (
    <UiButton 
    className={className}
      color={color}
      withBorder
      isClickable={workerIsOnline ?? false}
    >
      <span>{text}</span>
    </UiButton>
  )
}