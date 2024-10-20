import { LogoutButton } from "@/features/login/logout";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './profile.module.scss';
import { User } from "lucide-react";
import { useNavigate } from "react-router";

export function Profile() {
  const navigate = useNavigate();

  const handle = () => {
    navigate('/profile')
  }

  return (
    <div className={styles['profile-wrapper']}>
      <UiBorderBox onClick={handle} className={styles['profile']}>
        <UiBgContainer className={styles['profile-container']} >
          <User size={34} color="black" className={styles['user-icon']} />
        </UiBgContainer>
      </UiBorderBox>
      <LogoutButton className={styles['logout']}/>
    </div>
  );
}