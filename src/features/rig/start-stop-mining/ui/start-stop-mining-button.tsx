// import { BACKEND_TRIGGERS } from "@/shared/constants/backend-triggers";
// import { WebsocketContext } from "@/shared/lib/context/websocket-context";
import { UiButton } from "@/shared/ui/ui-button";

export function StartStopMiningButton({
  className,
  // rigId,
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

  const onClick = () => {
    if (rigIsActive) {
      // WebsocketContext.invoke(BACKEND_TRIGGERS.SEND_STOP_MINING, rigId)
    } else {
      // WebsocketContext.invoke(BACKEND_TRIGGERS.SEND_START_MINING, rigId)
    }
  }

  return (
    <UiButton 
    className={className}
      color={color}
      withBorder
      onClick={onClick}
      isClickable={rigIsOnline ?? false}
    >
      <span>{text}</span>
    </UiButton>
  )
}