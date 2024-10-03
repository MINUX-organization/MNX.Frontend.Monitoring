import { UiBorderBox } from '@/shared/ui/ui-border-box';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';
import { PresetForm } from '@/features/preset/form';
import { UiTitle } from '@/shared/ui/ui-title';
import { PresetItem, usePresetRepository } from '@/entities/preset';
import styles from './presetsList.module.scss'
import _, { set } from 'lodash';
import { match } from 'ts-pattern';
import { UiSpinner } from '@/shared/ui/ui-spinner';
import { ApplyPresetButton } from '@/features/preset/apply';
import { EditPresetButton } from '@/features/preset/edit';
import { DeletePresetButton } from '@/features/preset/delete';
import clsx from 'clsx';
import { usePresetStateStore } from '../model';
import { State } from '../model/preset-state.store';
import { useNavigate } from 'react-router';

export function PresetsList({
  gpuId,
  className
} : {
  className?: string;
  gpuId?: string;
}
) {
  const { selectedGpuName, selectedPreset, modalState, setModalState } = usePresetStateStore();

  const { getPresetsList, isLoading } = usePresetRepository();

  const navigate = useNavigate();

  const label = selectedPreset ? 'Edit preset' : 'Save as preset';

  const handle = (id: string) => {
    navigate(`?presetId=${id}`)
    
    setModalState(State.Idle);
  }

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
            const filteredPresetsList = _.filter(getPresetsList(), (preset) => _.startsWith(preset.gpuName, selectedGpuName ?? ''))

            if (_.isEmpty(filteredPresetsList)) return <span className={styles['centered']}>N/A</span>;

            return _.map(filteredPresetsList, (preset) => {
              const isSelectedPreset = selectedPreset?.id === preset.id;

              return <PresetItem
                className={clsx(
                  styles['preset-item'],
                  selectedPreset != undefined && !isSelectedPreset && modalState === State.Editing && styles['disabled'],
                  selectedPreset != undefined && isSelectedPreset && styles['selected']
                )}
                onClick={() => handle(preset.id)}
                key={preset.id} 
                preset={preset}
                renderApply={(id) => gpuId && <ApplyPresetButton presetId={id} isIcon/>}
                renderEdit={(id) => 
                  <EditPresetButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalState(State.Editing)
                    }}
                    presetId={id} 
                    isIcon 
                    isActive={isSelectedPreset && modalState === State.Editing}
                  />}
                renderDelete={(id) => <DeletePresetButton presetId={id} isIcon/>}
              />
            })
          })}
        </div>
      </UiBgContainer>
    </UiBorderBox>
  )
}