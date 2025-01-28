import { UiBorderBox } from '@/shared/ui/ui-border-box'
import styles from './styles/gpuItemPanel.module.scss'
import { UiBgContainer } from '@/shared/ui/ui-bg-container'
import clsx from 'clsx'
import { DeviceGpu } from '../model/types';
import { UiActiveState } from '@/shared/ui/ui-active-state';
import { GpuItemPanelTable } from './gpu-item-panel-table';
import { GpuItemPanelGrid } from './gpu-item-panel-grid';
import { StateObject } from '@/shared/lib/utils/state-object';
import { ReactNode } from 'react';

export function GpuItemPanel({
  className,
  deviceGpu,
  isOpen,
  renderOnOpen,
  renderSetting
} : {
  className?: string;
  deviceGpu: DeviceGpu;
  isOpen: StateObject<boolean>;
  renderOnOpen?: (isOpen: StateObject<boolean>) => ReactNode;
  renderSetting?: (id: string) => ReactNode;
}) {
  return (
    <UiBorderBox className={clsx(
      styles['gpu-item'],
      className
    )}>
      <UiBgContainer className={styles['gpu-item-container']} color="opaque">
        {<UiActiveState isActive={deviceGpu.miningState === 'Active'} />}
        <div className={styles['gpu-item-id']}>
          <span className={styles['ellipsis']}>
            <span className={clsx(
              styles['blue'],
              styles['text']
            )}>Id</span>&nbsp;
            {deviceGpu.id}
          </span>
          <span className={styles['ellipsis']}>
            <span className={clsx(
              styles['blue'],
              styles['text']
            )}>BUS</span>&nbsp;
            {deviceGpu.pci.bus}
          </span>
        </div>
        <div className={styles['gpu-item-name']}>
          <span className={styles['device-name']}>{deviceGpu.information.name}</span>
          <span className={styles['blue']}>{deviceGpu.rigName}</span>
        </div>
        <GpuItemPanelTable deviceGpu={deviceGpu}/>
        <GpuItemPanelGrid flightSheet={deviceGpu?.flightSheet}/>
        <div className={styles['features']}>
          {renderSetting?.(deviceGpu.id)}
          {renderOnOpen?.(isOpen)}
        </div>
      </UiBgContainer>
    </UiBorderBox>
  )
}