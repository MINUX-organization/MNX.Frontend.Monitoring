import { ProfileInfoCard, ProfileCard, useProfileRepository } from '@/entities/profile'
import styles from './profile.page.module.scss'
import { EditButton } from '@/features/profile/edit';
import { EditNicknameForm } from '@/features/profile/form';
import { EditPasswordButton } from '@/features/profile/edit';

export function ProfilePage() {
  const { profileInfo } = useProfileRepository();

  return (
    <div className={styles['profile-page']}>
      <ProfileCard
        className={styles['profile-card']}
        profileInfo={profileInfo}
        renderEdit={() => <EditButton 
          className={styles['default-font']} 
          text='Edit'
          renderModalContent={(onClose) => <EditNicknameForm nickname={profileInfo?.nickname} onClose={onClose} />}
        />}
        renderEditPassword={() => <EditPasswordButton className={styles['button']} />}
      />
      <ProfileInfoCard profileInfo={profileInfo}/>
    </div>
  )
}