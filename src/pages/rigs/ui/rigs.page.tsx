import { RigTotalItem, RigTotalItemInfo, RigTotalItemPanel } from '@/entities/rig';
import { Settings } from '@/features/rig/settings';
import { UiSelect } from '@/shared/ui/ui-select';
import { OnOpen } from '@/features/rig/on-open';
import styles from './rigs.page.module.scss';
import { match } from 'ts-pattern';
import _ from 'lodash';
import { useRigsQuery } from '@/entities/rig/model/rigs.query';
import { UiSpinner } from '@/shared/ui/ui-spinner';
import { StartStopMiningButton } from '@/features/rig/start-stop-mining';

export function RigsPage() {
  const options = [
    'ID',
    'Name',
    'Watt',
  ]

  const { rigsList, isLoading } = useRigsQuery();

  return (
    <div className={styles['rigs-page']}>
      <UiSelect
        className={styles['select']} 
        options={options} 
        getOptionLabel={(option) => option} 
        placeholder='Sort by' 
        selectedOnChange={(selected) => console.log(selected)}
      />
      {match(isLoading)
        .with(true, () => <UiSpinner />)
        .otherwise(() => {
          if (!rigsList || rigsList.length === 0) return <div className={styles['no-data']}>N/A</div>;

          return _.map(rigsList, (rig) => {
            if (!rig) return undefined;
            
            return (
              <RigTotalItem 
                key={rig.id}
                className={styles['rig-total-item']}
                rig={rig}
                withFeatures={true}
                renderItemPanel={(rig, isOpen, withFeatures) => 
                  <RigTotalItemPanel 
                    rig={rig} 
                    isOpen={isOpen}
                    withFeatures={withFeatures}
                    renderStartMining={(id) => <StartStopMiningButton rigId={id} rigIsOnline/>}
                    renderOnOpen={(isOpen) => <OnOpen isOpen={isOpen}/>}
                    renderSetting={(id) => <Settings id={id} />}
                  />} 
                renderItemInfo={(rig) => rig && <RigTotalItemInfo rig={rig} />}
              />
            )
          })
        })}
    </div>
  )
}