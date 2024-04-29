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
        {deviceGpu?.isActive && <UiActiveState isActive={deviceGpu.isActive} />}
        <div className={styles['gpu-item-id']}>
          <span>
            <span className={clsx(
              styles['blue'],
              styles['text']
            )}>Index</span>&nbsp;
            {deviceGpu.id}
          </span>
          <span>
            <span className={clsx(
              styles['blue'],
              styles['text']
            )}>BUS</span>&nbsp;
            {deviceGpu.bus}
          </span>
        </div>
        <div className={styles['gpu-item-name']}>
          <span className={styles['device-name']}>{deviceGpu.name}</span>
          <span className={styles['blue']}>{deviceGpu.rigName}</span>
        </div>
        <GpuItemPanelTable deviceGpu={deviceGpu}/>
        <GpuItemPanelGrid coinsList={deviceGpu.coins}/>
        <div className={styles['features']}>
          {renderSetting?.(deviceGpu.id)}
          {renderOnOpen?.(isOpen)}
        </div>
      </UiBgContainer>
    </UiBorderBox>
  )
}