import { UiBorderBox } from '@/shared/ui/ui-border-box';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';
import { PresetForm } from '@/features/preset/form';
import { UiTitle } from '@/shared/ui/ui-title';
import { PresetItem, usePresetRepository } from '@/entities/preset';
import styles from './presetsList.module.scss'
import _ from 'lodash';
import { match } from 'ts-pattern';
import { UiSpinner } from '@/shared/ui/ui-spinner';
import { ApplyPresetButton } from '@/features/preset/apply';
import { EditPresetButton } from '@/features/preset/edit';
import { DeletePresetButton } from '@/features/preset/delete';
import clsx from 'clsx';
import { usePresetStateStore } from '../model';

export function PresetsList({
  gpuId,
  className
} : {
  className?: string;
  gpuId?: string;
}
) {
  const { selectedGpuName, selectedPreset } = usePresetStateStore();

  const { getPresetsList } = usePresetRepository();

  const label = selectedPreset ? 'Edit preset' : 'Save as preset';

  return (
    <UiBorderBox className={styles['presets-list']}>
      <UiBgContainer className={clsx(className, styles['presets-list-container'])} color='opaque'>
        <PresetForm label={label} gpuId={gpuId}/>
        <UiTitle className={styles['title']} label='List of presets' />
        <div className={styles['presets-list-items']}>
          {match(false)
          .with(true, () => (
            <UiSpinner className={styles['centered']}/>
          ))
          .otherwise(() => {
            const findedPresetsList = _.filter(getPresetsList(), (preset) => _.startsWith(preset.gpuName, selectedGpuName))

            if (_.isEmpty(findedPresetsList)) return <span className={styles['centered']}>N/A</span>;

            return _.map(findedPresetsList, (preset) => {
              const isSelectedPreset = selectedPreset?.id === preset.id;

              return <PresetItem
                className={clsx(selectedPreset != undefined && !isSelectedPreset && styles['disabled'])}
                key={preset.id} 
                preset={preset}
                renderApply={(id) => <ApplyPresetButton presetId={id} isIcon/>}
                renderEdit={(id) => <EditPresetButton presetId={id} isIcon isActive={isSelectedPreset}/>}
                renderDelete={(id) => <DeletePresetButton presetId={id} isIcon/>}
              />
            })
          })}
        </div>
      </UiBgContainer>
    </UiBorderBox>
  )
}