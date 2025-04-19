import { sessionRepository } from "@/entities/session";
import { isSuccessResponse } from "@/shared/api";
import { UiButton, UiText } from "@/shared/ui";
import { ButtonProps } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";

const { sessionQuery, useSessionMutation } = sessionRepository;

export function RemoveSessionButton({ ...props }: ButtonProps) {
  const navigate = useNavigate();
  const session = sessionQuery();
  const { removeSession } = useSessionMutation();

  const handleRemoveSession = async () => {
    if (!session) {
      return;
    }

    const response = await removeSession(session.refreshToken);

    if (isSuccessResponse(response)) {
      navigate({ to: '/login', });
      return;
    }
  }

  return (
    <UiButton {...props} onClick={handleRemoveSession} colorPalette={'cancel'}>
      <UiText>Log out</UiText>
    </UiButton>
  )
}