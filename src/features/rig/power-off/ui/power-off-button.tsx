// import { BACKEND_TRIGGERS } from "@/shared/constants/backend-triggers";
// import { WebsocketContext } from "@/shared/lib/context/websocket-context";
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

  const onClick = () => {
    if (!rigId) return;

    // WebsocketContext.invoke(BACKEND_TRIGGERS.SEND_POWER_OFF_RIG, rigId);
  }

  return (
    <UiButton
      className={className}
      color="red"
      withBorder
      onClick={onClick}
      isClickable={rigIsOnline ?? false}
    >
      <span>POWER OFF</span>
    </UiButton>
  )
}