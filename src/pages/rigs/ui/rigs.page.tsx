import { UiSelect } from '@/shared/ui/ui-select';
import styles from './rigs.page.module.scss';
import { RigTotal, RigTotalItem, RigTotalItemInfo, RigTotalItemPanel } from '@/entities/rig';
import { OnOpen } from '@/features/rig/on-open';
import { Settings } from '@/features/rig/settings';
import { match } from 'ts-pattern';
import _ from 'lodash';
import { ZodSaveParse } from '@/shared/lib/utils/zod-save-parse';

export function RigsPage() {
  const options = [
    'ID',
    'Name',
    'Watt',
  ]

  // ws connetion
  const rig: RigTotal[] | undefined = undefined
  const validatedData = ZodSaveParse(rig, RigTotal.array())

  return (
    <div className={styles['rigs-page']}>
      <UiSelect
        className={styles['select']} 
        options={options} 
        getOptionLabel={(option) => option} 
        placeholder='Sort by' 
        selectedOnChange={(selected) => console.log(selected)}
      />
      {match(validatedData)
        .with(undefined, () => <div className={styles['no-data']}>N/A</div>)
        .otherwise((rig) => {
          return _.map(rig, (rig) => (
            <RigTotalItem 
              key={rig.index}
              className={styles['rig-total-item']}
              rig={rig}
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
          ))
        })}
    </div>
  )
}