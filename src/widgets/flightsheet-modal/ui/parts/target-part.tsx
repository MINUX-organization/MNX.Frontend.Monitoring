import { Control, Controller, UseFormWatch } from 'react-hook-form';
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
import { UiTextArea } from '@/shared/ui/ui-textarea';
import clsx from 'clsx';

export function TargetPart({
  className,
  miners,
  control,
  type,
  watch,
} : {
  className?: string;
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
      <Controller
        control={control}
        name={`target.${index}.miner`}
        render={({ field : { onChange } }) => (
          <UiComboBox
            className={styles['field']}
            options={miners ?? []}
            title={`${type} Miner`}
            getOptionLabel={(option) => option?.name ?? ''}
            selectedOption={currentMiner}
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
          index={index}
          type={type}
        />
      ))}
      <UiInput
        className={styles['bottom-field']}
        control={control}
        value={''}
        name={`target.${index}.additionalArguments`}
        label={`${type} miner additional parameters`}
        placeholder='Write additional arguments'
      />
      <UiTextArea
        className={styles['bottom-field']}
        control={control}
        value={''}
        name={`target.${index}.configFile`}
        label={`${type} miner config file`}
        placeholder='Write config file'
      />
    </div>
  )
}

