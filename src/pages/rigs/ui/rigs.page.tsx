import { UiSelect } from '@/shared/ui/ui-select';
import styles from './rigs.page.module.scss';
import { RigTotalItem, RigTotalItemInfo, RigTotalItemPanel } from '@/entities/rig';
import { OnOpen } from '@/features/rig/on-open';
import { Settings } from '@/features/rig/settings';
import { mockRigTotal } from '../mocks/mock-rig-total';

export function Rigs() {
  const options = [
    'ID',
    'Name',
    'Watt',
  ]

  return (
    <div className={styles['rigs-page']}>
      <UiSelect
        className={styles['select']} 
        options={options} 
        getOptionLabel={(option) => option} 
        placeholder='Sort by' 
        selectedOnChange={(selected) => console.log(selected)}
      />
      <RigTotalItem 
        className={styles['rig-total-item']}
        rig={mockRigTotal}
        withFeatures={true}
        renderItemPanel={(rig, setIsOpen) => 
          <RigTotalItemPanel 
            rig={rig} 
            setIsOpen={setIsOpen}
            renderOnOpen={(setIsOpen) => <OnOpen setIsOpen={setIsOpen}/>}
            renderSetting={(id) => <Settings id={id} />}
          />} 
        renderItemInfo={(rig) => rig && <RigTotalItemInfo rig={rig} />}
      />
    </div>
  )
}