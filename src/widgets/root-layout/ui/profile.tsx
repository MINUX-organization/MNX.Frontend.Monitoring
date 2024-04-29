// import { useSession } from "@/entities/session";
// import { getAvatarUrl } from "@/entities/user";

import { LogoutButton } from "@/features/login/logout";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";

export function Profile() {
  // const { currentSession } = useSession();

  // if (!currentSession) return null;

  return (
    <UiBorderBox>
      <UiBgContainer color="opaque">
        <LogoutButton />
      </UiBgContainer>
    </UiBorderBox>
  );
}