import { useSessionRepository } from "@/entities/session";
import { UiButton } from "@/shared/ui/ui-button";

export function LogoutButton({
  className
} : {
  className?: string;
}) {
  const { removeSession } = useSessionRepository();

  const handle = () => {
    removeSession();
  }

  return (
    <UiButton color="red" withBorder className={className} onClick={handle}>
      Logout
    </UiButton>
  )
}