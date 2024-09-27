import styles from './preset.page.module.scss';
import { CreatePresetButton } from "@/features/preset/create";
import { UiSearch } from "@/shared/ui/ui-search";
import { PresetSlice } from '@/entities/preset/ui/preset-slice';
import { OnOpen } from '@/features/preset/on-open';
import { PresetGroupedList } from '@/entities/preset';
import _ from 'lodash';
import { ApplyPresetButton } from '@/features/preset/apply/ui/apply-preset-button';
import { EditPresetButton } from '@/features/preset/edit';
import { DeletePresetButton } from '@/features/preset/delete/ui/delete-preset-button';
import { Outlet } from 'react-router';

const PresetMock: PresetGroupedList[] = [{
  name: 'NVIDIA GeForce RTX 3080',
  presetsList: [{
    id: '1',
    name: 'My Preset',
    gpuName: 'NVIDIA GeForce RTX 3080',
    overclocking: {
      memoryVendor: 'Corsair',
      memoryType: 'DDR4',
      powerLimit: 150,
      fanSpeed: 1200,
      criticalTemperature: 80,
      memoryClockLock: 3200,
      memoryClockOffset: 100,
      memoryVoltage: 1.35,
      memoryVoltageOffset: 0.05,
      coreClockLock: 3.2,
      coreClockOffset: 100,
      coreVoltage: 1.2,
      coreVoltageOffset: 0.05,
    }
  }]
}]

export function PresetPage() {
  return (
    <div className={styles['preset-page']}>
      <div className={styles['header']}>
        <CreatePresetButton className={styles['button']}/>
        <UiSearch placeholder="Search" className={styles['search']}/>
      </div>
      {_.map(PresetMock, (item) => (  
        <PresetSlice 
          preset={item}
          key={item.name}
          renderOnOpen={(isOpen) => <OnOpen isOpen={isOpen}/>}
          renderApply={(id) => <ApplyPresetButton />}
          renderEdit={(id) => <EditPresetButton presetId={id} isNavigate/>}
          renderDelete={(id) => <DeletePresetButton presetId={id}/>}
        />
      ))}
      <Outlet />
    </div>
  )
}