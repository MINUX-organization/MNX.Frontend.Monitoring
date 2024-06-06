import { RigTotal, RigTotalItem, RigTotalItemInfo, RigTotalItemPanel } from '@/entities/rig';
import { ZodSaveParse } from '@/shared/lib/utils/zod-save-parse';
import { Settings } from '@/features/rig/settings';
import { UiSelect } from '@/shared/ui/ui-select';
import { OnOpen } from '@/features/rig/on-open';
import styles from './rigs.page.module.scss';
import { match } from 'ts-pattern';
import _ from 'lodash';

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
              renderItemPanel={(rig, isOpen) => 
                <RigTotalItemPanel 
                  rig={rig} 
                  isOpen={isOpen}
                  renderOnOpen={(isOpen) => <OnOpen isOpen={isOpen}/>}
                  renderSetting={(id) => <Settings id={id} />}
                />} 
              renderItemInfo={(rig) => rig && <RigTotalItemInfo rig={rig} />}
            />
          ))
        })}
    </div>
  )
}