import { UiBorderBox } from '@/shared/ui/ui-border-box'
import styles from './styles/rigInternetInfo.page.module.scss'
import { UiBgContainer } from '@/shared/ui/ui-bg-container'

export function RigInternetInfoPage() {
  return (
    <UiBorderBox className={styles['rig-internet-info']}>
      <UiBgContainer className={styles['container']} color='opaque'>
        
      </UiBgContainer>
    </UiBorderBox>
  )
}