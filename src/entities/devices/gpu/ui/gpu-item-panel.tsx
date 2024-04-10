import { UiBorderBox } from '@/shared/ui/ui-border-box'
import styles from './styles/gpuItemInfoPanelPanel.module.scss'
import { UiBgContainer } from '@/shared/ui/ui-bg-container'
import clsx from 'clsx'
import { DeviceGpu } from '../model/types';
import { UiActiveState } from '@/shared/ui/ui-active-state';
import { GpuItemPanelTable } from './gpu-item-panel-table';

export function GpuItemPanel({
  className,
  deviceGpu,
} : {
  className?: string;
  deviceGpu: DeviceGpu;
}) {
  return (
    <UiBorderBox className={clsx(
      styles['gpu-item'],
      className
    )}>
    <UiBgContainer className={styles['gpu-item-container']} color="opaque">
      {deviceGpu?.isActive && <UiActiveState isActive={deviceGpu.isActive} />}
      <div className={styles['gpu-item-id']}>
        <span>
          <span className={styles['blue']}>ID</span>&nbsp;
          {deviceGpu.id}
        </span>
        <span>
          <span className={styles['blue']}>BUS</span>
          {deviceGpu.bus}
        </span>
      </div>
      <div className={styles['gpu-item-name']}>
        <span className={styles['device-name']}>{deviceGpu.name}</span>
        <span className={styles['blue']}>{deviceGpu.rigName}</span>
      </div>
      <GpuItemPanelTable deviceGpu={deviceGpu}/>
    </UiBgContainer>
  </UiBorderBox>
  )
}