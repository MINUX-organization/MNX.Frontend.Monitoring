import { UiButton } from "@/shared/ui/ui-button";

export function StartStopMiningButton({
  className,
  rigId,
  rigIsActive,
  rigIsOnline
} : {
  className?: string;
  rigId?: string;
  rigIsActive?: boolean;
  rigIsOnline?: boolean;
}) {
  const text = rigIsActive ? 'STOP MINING' : 'START MINING'
  const color = rigIsActive ? 'red' : 'blue' 
  return (
    <UiButton 
    className={className}
      color={color}
      withBorder
      isClickable={rigIsOnline ?? false}
    >
      <span>{text}</span>
    </UiButton>
  )
}