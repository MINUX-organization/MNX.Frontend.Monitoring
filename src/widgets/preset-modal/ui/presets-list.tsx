import { UiBorderBox } from '@/shared/ui/ui-border-box';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';
import { PresetForm } from '@/features/preset/form';
import { UiTitle } from '@/shared/ui/ui-title';
import { PresetItem, usePresetRepository } from '@/entities/preset';
import styles from './presetsList.module.scss'
import _ from 'lodash';
import { match } from 'ts-pattern';
import { UiSpinner } from '@/shared/ui/ui-spinner';



export function PresetsList({
  gpuId
} : {
  gpuId?: string;
}
) {
  const { isLoading } = usePresetRepository();
  const mockPreset = [{
    id: 'preset-123',
    name: 'My Preset',
    memoryVendor: 'Corsair',
    memoryType: 'DDR4',
    powerLimit: { value: 150, measureUnit: 'W' },
    fanSpeed: 1200,
    criticalTemperature: 80,
    memoryClockLock: { value: 3200, measureUnit: 'MHz' },
    memoryClockOffset: { value: 100, measureUnit: 'MHz' },
    memoryVoltage: { value: 1.35, measureUnit: 'V' },
    memoryVoltageOffset: { value: 0.05, measureUnit: 'V' },
    coreClockLock: { value: 3.2, measureUnit: 'GHz' },
    coreClockOffset: { value: 100, measureUnit: 'MHz' },
    coreVoltage: { value: 1.2, measureUnit: 'V' },
    coreVoltageOffset: { value: 0.05, measureUnit: 'V' },
  }];
  return (
    <UiBorderBox className={styles['presets-list']}>
      <UiBgContainer className='' color='opaque'>
        <PresetForm label='Save as preset' gpuId={gpuId} />
        <UiTitle className={styles['title']} label='List of presets' />
        <div className={styles['presets-list-items']}>
          {match(isLoading)
          .with(true, () => (
            <UiSpinner className={styles['centered']}/>
          ))
          .otherwise(() => {
            // if (_.isEmpty(getPresetsList())) return <span className={styles['centered']}>N/A</span>;

            return _.map(mockPreset, (preset) => (
              <PresetItem key={preset.id} preset={preset} />
            ))
          })}
        </div>
      </UiBgContainer>
    </UiBorderBox>
  )
}