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
import { getPresetsListByGpuNameApi } from '@/shared/api/get/getPresetsListByGpuName';
import { useQuery } from 'react-query';

// const PresetMock: PresetGroupedList[] = [{
//   name: 'NVIDIA GeForce RTX 3080',
//   presets: [{
//     id: '1',
//     name: 'My Preset',
//     gpuName: 'NVIDIA GeForce RTX 3080',
//     overclocking: {
//       powerLimit: 150,
//       fanSpeed: 1200,
//       memoryClockLock: 3200,
//       memoryClockOffset: 100,
//       memoryVoltage: 1.35,
//       memoryVoltageOffset: 0.05,
//       coreClockLock: 3.2,
//       coreClockOffset: 100,
//       coreVoltage: 1.2,
//       coreVoltageOffset: 0.05,
//     }
//   },
//   {
//     id: '2',
//     name: 'My Preset',
//     gpuName: 'NVIDIA GeForce RTX 3080',
//     overclocking: {
//       powerLimit: 150,
//       fanSpeed: 1200,
//       memoryClockLock: 3200,
//       memoryClockOffset: 100,
//       memoryVoltage: 1.35,
//       memoryVoltageOffset: 0.05,
//       coreClockLock: 3.2,
//       coreClockOffset: 100,
//       coreVoltage: 1.2,
//       coreVoltageOffset: 0.05,
//     }
//   }],
// }, {
//   name: 'NVIDIA GeForce RTX 3090',
//   presets: [{
//     id: '3',
//     name: 'My Preset',
//     gpuName: 'NVIDIA GeForce RTX 3090',
//     overclocking: {
//       powerLimit: 150,
//       fanSpeed: 1200,
//       memoryClockLock: 3200,
//       memoryClockOffset: 100,
//       memoryVoltage: 1.35,
//       memoryVoltageOffset: 0.05,
//       coreClockLock: 3.2,
//       coreClockOffset: 100,
//       coreVoltage: 1.2,
//       coreVoltageOffset: 0.05,
//     }
//   }],
// }]

export function PresetPage() {
  const { data } = useQuery(['presetsListByGpuName'], getPresetsListByGpuNameApi);

  return (
    <div className={styles['preset-page']}>
      <div className={styles['header']}>
        <CreatePresetButton className={styles['button']}/>
        <UiSearch placeholder="Search" className={styles['search']}/>
      </div>
      {_.map(data, (item) => (  
        <PresetSlice 
          preset={item}
          key={item.name}
          renderOnOpen={(isOpen) => <OnOpen isOpen={isOpen}/>}
          renderApply={(id) => <ApplyPresetButton presetId={id}/>}
          renderEdit={(id) => <EditPresetButton presetId={id} isNavigate/>}
          renderDelete={(id) => <DeletePresetButton presetId={id}/>}
        />
      ))}
      <Outlet />
    </div>
  )
}