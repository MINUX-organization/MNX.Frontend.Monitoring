// import { BACKEND_TRIGGERS } from "@/shared/constants/backend-triggers";
// import { WebsocketContext } from "@/shared/lib/context/websocket-context";
import { startMiningApi } from "@/shared/api/post/startMining";
import { stopMiningApi } from "@/shared/api/post/stopMining";
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

  const onClick = () => {
    if (rigIsActive) {
      // WebsocketContext.invoke(BACKEND_TRIGGERS.SEND_STOP_MINING, rigId)
      const response = stopMiningApi(rigId ?? '');

      if (!response) return;

      console.log('stop mining {}', rigId);
    } else {
      const response = startMiningApi(rigId ?? '');

      if (!response) return;

      console.log('start mining {}', rigId);
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