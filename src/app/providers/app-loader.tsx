// import { useBoards } from "@/entities/board";
// import { useSession } from "@/entities/session";
// import { useUsers } from "@/entities/user";
// import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ReactNode, useEffect, useState } from "react";

export function AppLoader({ children }: { children?: ReactNode }) {
  // const loadUser = useUser((s) => s.loadUser);
  // const loadSession = useSession((s) => s.loadSession);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(true);

  //   Promise.all([loadSession(), loadUser()]).finally(() => {
  //     setIsLoading(false);
  //   });
  // }, [loadSession, loadUser]);

  // if (isLoading) {
  //   return <UiPageSpinner />;
  // }

  return <>{children}</>;
}