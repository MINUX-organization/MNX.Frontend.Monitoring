import styles from './preset.page.module.scss';
import { CreatePresetButton } from "@/features/preset/create";
import { UiSearch } from "@/shared/ui/ui-search";
import { PresetSlice } from '@/entities/preset/ui/preset-slice';
import { OnOpen } from '@/features/preset/on-open';
import _ from 'lodash';
import { ApplyPresetButton } from '@/features/preset/apply/ui/apply-preset-button';
import { EditPresetButton } from '@/features/preset/edit';
import { DeletePresetButton } from '@/features/preset/delete/ui/delete-preset-button';
import { Outlet } from 'react-router';
import { usePresetByGpuNameRepository } from '@/entities/preset';

export function PresetPage() {
  const { getPresetsByGpuNameList } = usePresetByGpuNameRepository();

  return (
    <div className={styles['preset-page']}>
      <div className={styles['header']}>
        <CreatePresetButton className={styles['button']}/>
        <UiSearch placeholder="Search" className={styles['search']}/>
      </div>
      {_.map(getPresetsByGpuNameList(), (item) => (  
        <PresetSlice 
          preset={item}
          key={item.name}
          renderOnOpen={(isOpen) => <OnOpen isOpen={isOpen}/>}
          renderApply={(id) => <ApplyPresetButton presetId={id}/>}
          renderEdit={(id) => <EditPresetButton presetId={id} isNavigate/>}
          renderDelete={(id, preset) => <DeletePresetButton presetId={id} preset={preset}/>}
        />
      ))}
      <Outlet />
    </div>
  )
}