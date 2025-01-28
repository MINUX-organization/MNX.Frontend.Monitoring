import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { ProfileInfo } from "../model/types";
import styles from './profileCard.module.scss'
import clsx from "clsx";

export function ProfileCard({
  className,
  profileInfo,
  renderEdit,
  renderEditPassword,
} : {
  className?: string,
  profileInfo?: ProfileInfo,
  renderEdit?: () => React.ReactNode,
  renderEditPassword?: () => React.ReactNode
}) {
  return (
    <UiBorderBox className={clsx(className, styles['profile-card'])}>
      <UiBgContainer className={styles['profile-card-container']} color='opaque'>
        <div className={styles['profile-info']}>
          <div className={styles['profile-nickname']}>
            <span>{profileInfo?.nickname}</span>
            {renderEdit?.()}
          </div>
          <span className={styles['profile-login']}>{profileInfo?.login}</span>
        </div>
        {renderEditPassword?.()}
      </UiBgContainer>
    </UiBorderBox>
  )
}