import { Control, Controller, UseFormWatch } from 'react-hook-form';
import styles from './target.module.scss';
import { FormInput } from '../flightsheet-modal';
import { UiComboBox } from '@/shared/ui/ui-combobox';
import { Miner } from '@/entities/flightsheet/modal/types';
import { Pool } from '@/entities/pool';
import { Wallet } from '@/entities/wallet';
import _ from 'lodash';
import { ConfigFields } from './config-fields';
import { match } from 'ts-pattern';
import { useStateObject } from '@/shared/lib/utils/state-object';
import { useEffect } from 'react';
import { UiInput } from '@/shared/ui/ui-input';
import { UiTextArea } from '@/shared/ui/ui-textarea';
import clsx from 'clsx';

export function TargetPart({
  className,
  miners,
  wallets,
  pools,
  control,
  type,
  watch,
} : {
  className?: string;
  miners?: Miner[];
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

  const currentMiner = watch(`targets.${index}.miner`);

  useEffect(() => {
    minerMod.setValue(
      match(currentMiner?.miningMode)
      .with('Single', () => 1)
      .with('Dual', () => 2)
      .with('Triple', () => 3)
      .otherwise(() => 1));
  }, [currentMiner]);
  
  return (
    <div className={clsx(className, styles['target-part'])}>
      <div className={styles['fields']}>
        <Controller
          control={control}
          name={`targets.${index}.miner`}
          render={({ field : { onChange } }) => (
            <UiComboBox
              className={styles['field']}
              options={miners ?? []}
              title={`${type} Miner`}
              getOptionLabel={(option) => option?.name ?? ''}
              selectedOption={currentMiner ?? {}}
              placeholder="Select miner"
              selectedOnChange={onChange}
            />
          )}
        />
        {type === 'CPU' && <UiInput
          className={styles['field']}
          control={control}
          name={`targets.${index}.miningConfig.threadsCount`}
          label={`${type} threads count`}
          placeholder='Write threads count'
        />}
        {type === 'CPU' && <UiInput
          className={styles['field']}
          control={control}
          name={`targets.${index}.miningConfig.hugePages`}
          label={`${type} hugepages`}
          placeholder='Write hugepages'
        />}
      </div>
      {_.range(minerMod.value).map((index) => (
        <ConfigFields 
          className={styles['field']}
          key={index}
          control={control}
          wallets={wallets}
          pools={pools}
          index={index}
          type={type}
        />
      ))}
      <UiInput
        className={styles['bottom-field']}
        control={control}
        name={`targets.${index}.miningConfig.additionalArguments`}
        label={`${type} miner additional parameters`}
        placeholder='Write additional arguments'
      />
      <UiTextArea
        className={styles['bottom-field']}
        control={control}
        name={`targets.${index}.miningConfig.configFileContent`}
        label={`${type} miner config file`}
        placeholder='Write config file'
      />
    </div>
  )
}

