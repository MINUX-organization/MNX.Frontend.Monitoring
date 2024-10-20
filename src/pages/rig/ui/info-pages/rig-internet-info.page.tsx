import { UiBorderBox } from '@/shared/ui/ui-border-box'
import styles from './styles/rigInternetInfo.page.module.scss'
import { UiBgContainer } from '@/shared/ui/ui-bg-container'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getRigInternetApi } from '@/shared/api/get/getRigInternet'
import { RigInternetInfo } from '@/entities/rig'
import { ZodSaveParse } from '@/shared/lib/utils/zod-save-parse'
import { match } from 'ts-pattern'
import { RigTotalItemInternetInfo } from '@/entities/rig'
import { UiSpinner } from '@/shared/ui/ui-spinner'

export function RigInternetInfoPage() {
  const { rigId } = useParams()
  const { data, isLoading } = useQuery(['rigInternetInfo', rigId], () => getRigInternetApi(rigId ?? ''))

  const validatedData = ZodSaveParse(data, RigInternetInfo)

  return (
    <UiBorderBox className={styles['rig-internet-info']}>
      <UiBgContainer className={styles['container']} color='opaque'>
        {match(validatedData)
          .with(undefined, () => 
            <div className={styles['no-data']}>
              {isLoading ? <UiSpinner /> : 'N/A'}
            </div>)
          .otherwise((validatedData) => <RigTotalItemInternetInfo rigInternet={validatedData} />)}
      </UiBgContainer>
    </UiBorderBox>
  )
}