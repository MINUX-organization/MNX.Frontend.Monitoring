import { ROUTER_PATHS } from "@/shared/constants/routes";
import { UiButton } from "@/shared/ui/ui-button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function BackButton({ 
  className,
} : {
  className?: string; 
}) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`../${ROUTER_PATHS.RIGS}`, { replace: true });
  }

  return (
    <UiButton
      color="blue"
      withBorder
      isClickable
      className={className}
      onClick={onClick}
    >
      <ArrowLeft />
      <span>BACK</span>
    </UiButton>
  )
}