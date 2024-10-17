import { Control, Controller, useFieldArray, UseFormWatch } from 'react-hook-form';
import styles from './target.module.scss';
import { FormInput } from '../flightsheet-modal';
import { UiComboBox } from '@/shared/ui/ui-combobox';
import { Miner } from '@/entities/flightsheet/modal/types';
import { Crypto } from '@/entities/crypto';
import { Pool } from '@/entities/pool';
import { Wallet } from '@/entities/wallet';
import _ from 'lodash';
import { ConfigFields } from './config-fields';
import { match } from 'ts-pattern';
import { useStateObject } from '@/shared/lib/utils/state-object';
import { useEffect } from 'react';
import { UiInput } from '@/shared/ui/ui-input';

export function TargetPart({
  miners,
  control,
  type,
  watch,
} : {
  miners?: Miner[];
  coins?: Crypto[];
  wallets?: Wallet[];
  pools?: Pool[];
  type: 'CPU' | 'GPU';
  watch: UseFormWatch<FormInput>;
  control: Control<FormInput, any, FormInput>;
}) {
  const minerMod = useStateObject(1);

  const index = match(type)
    .with('GPU', () => 0)
    .with('CPU', () => 1)
    .otherwise(() => 0);

  const currentMiner = watch(`target.${index}.miner`);

  const { fields } = useFieldArray({
    control,
    name: "target",
  });

  useEffect(() => {
    minerMod.setValue(
      match(currentMiner?.miningMode)
      .with('Single', () => 1)
      .with('Dual', () => 2)
      .with('Triple', () => 3)
      .otherwise(() => 1));
  }, [currentMiner]);
  
  return (
    <div className={styles['gpu-part']}>
      <Controller
        control={control}
        name={`target.${index}.miner`}
        render={({ field : { onChange } }) => (
          <UiComboBox
            className={styles['field']}
            options={miners ?? [
              {id: '1', name: 'N/A', version: 'N/A', deviceType: 'N/A', miningMode: 'Triple'},
              {id: '2', name: 'N/A', version: 'N/A', deviceType: 'N/A', miningMode: 'Dual'},
              {id: '3', name: 'N/A', version: 'N/A', deviceType: 'N/A', miningMode: 'Single'},
            ]}
            title={`${type} Miner`}
            getOptionLabel={(option) => option?.name ?? ''}
            selectedOption={fields[0]?.miner}
            placeholder="Select miner"
            selectedOnChange={onChange}
          />
        )}
      />
      {_.range(minerMod.value).map((index) => (
        <ConfigFields 
          className={styles['field']} 
          key={index} 
          control={control} 
          fields={fields} 
          index={index}
          type={type}
        />
      ))}
      <UiInput
        className={styles['bottom-field']}
        control={control}
        name='target.0.additionalArguments'
        label={`${type} Miner`}
        placeholder='Write additional arguments'
      />
      <UiInput
        className={styles['bottom-field']}
        control={control}
        name='target.0.configFile'
        label={`${type} Miner`}
        placeholder='Write config file'
      />
    </div>
  )
}

