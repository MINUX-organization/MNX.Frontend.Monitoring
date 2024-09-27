import { UiBorderBox } from '@/shared/ui/ui-border-box';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';
import { PresetForm } from '@/features/preset/form';
import { UiTitle } from '@/shared/ui/ui-title';
import { Preset, PresetItem, usePresetRepository } from '@/entities/preset';
import styles from './presetsList.module.scss'
import _ from 'lodash';
import { match } from 'ts-pattern';
import { UiSpinner } from '@/shared/ui/ui-spinner';
import { ApplyPresetButton } from '@/features/preset/apply';
import { EditPresetButton } from '@/features/preset/edit';
import { DeletePresetButton } from '@/features/preset/delete';
import clsx from 'clsx';

export function PresetsList({
  gpuId,
  presetsList,
  selectedPresetId,
  className
} : {
  className?: string;
  gpuId?: string;
  presetsList?: Preset[];
  selectedPresetId?: string;
  onChange?: (preset: Preset) => void;
}
) {
  const { isLoading } = usePresetRepository();
  
  return (
    <UiBorderBox className={styles['presets-list']}>
      <UiBgContainer className={clsx(className, styles['presets-list-container'])} color='opaque'>
        <PresetForm label='Save as preset' gpuId={gpuId} />
        <UiTitle className={styles['title']} label='List of presets' />
        <div className={styles['presets-list-items']}>
          {match(isLoading)
          .with(isLoading, () => (
            <UiSpinner className={styles['centered']}/>
          ))
          .otherwise(() => {
            if (_.isEmpty(presetsList)) return <span className={styles['centered']}>N/A</span>;

            return _.map(presetsList, (preset) => {
              const isSelectedPreset = selectedPresetId === preset.id;

              return <PresetItem 
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