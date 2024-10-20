import { useSessionRepository } from "@/entities/session";
import { UiButton } from "@/shared/ui/ui-button";
import { LogOut } from "lucide-react";

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
    <UiButton className={className} onClick={handle}>
      <LogOut size={28} color="#FC4E4E"/>
    </UiButton>
  )
}