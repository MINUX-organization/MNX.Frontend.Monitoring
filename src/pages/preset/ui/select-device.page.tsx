import { useNavigate } from 'react-router';
import styles from './selectDevice.module.scss';
import { UiSearch } from '@/shared/ui/ui-search';
import { UiButton } from '@/shared/ui/ui-button';
import { UiBorderBox } from '@/shared/ui/ui-border-box';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';

export function SelectDevicePage() {
  const navigate = useNavigate();

  return (
    <div className={styles['select-device-page']}>
      <div className={styles['header']}>
        <UiButton 
          className={styles['back-button']} 
          color="blue" 
          withBorder 
          onClick={() => navigate(-1)}
        >
          Back
        </UiButton>
        <UiSearch placeholder="Search" className={styles['search']}/>
      </div>
      <UiBorderBox>
        <UiBgContainer color="opaque">
          <h1>select device</h1>
        </UiBgContainer>
      </UiBorderBox>
    </div>
  )
}