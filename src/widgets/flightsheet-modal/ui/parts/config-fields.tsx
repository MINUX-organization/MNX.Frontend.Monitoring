import { Control, Controller } from "react-hook-form";
import { FormInput } from "../flightsheet-modal";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import { UiInput } from "@/shared/ui/ui-input";
import { Wallet } from "@/entities/wallet";
import { Pool } from "@/entities/pool";
import styles from './configFields.module.scss';
import { match } from "ts-pattern";

export function ConfigFields({
  className,
  control,
  index,
  wallets,
  pools,
  type,
} : {
  className?: string;
  control: Control<FormInput, any, FormInput>;
  wallets?: Wallet[];
  pools?: Pool[];
  index: number;
  type: 'CPU' | 'GPU';
}) {
  const typeIndex = match(type)
    .with('GPU', () => 0)
    .with('CPU', () => 1)
    .otherwise(() => 0);

  return (
    <div className={styles['fields']}>
      <Controller
        control={control}
        name={`targets.${typeIndex}.miningConfig.coinConfigs.${index}.wallet`}
        render={({ field : { onChange, value } }) => (
          <UiComboBox 
            className={className}
            options={wallets ?? []}
            title={`${type} Wallet ${index + 1}`}
            getOptionLabel={(option) => option.name && `${option.name} - ${option.cryptocurrency}`}
            selectedOption={value ?? {}}
            placeholder="Select wallet"
            selectedOnChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name={`targets.${typeIndex}.miningConfig.coinConfigs.${index}.pool`}
        render={({ field : { onChange, value } }) => (
          <UiComboBox
            className={className}
            options={pools ?? []}
            title={`${type} Pool ${index + 1}`}
            getOptionLabel={(option) => option.domain && `${option.domain} - ${option.cryptocurrency}`}
            selectedOption={value ?? {}}
            placeholder="Select pool"
            selectedOnChange={onChange}
          />
        )}
      />
      <UiInput
        className={className}
        control={control}
        name={`targets.${typeIndex}.miningConfig.coinConfigs.${index}.poolPassword`}
        value={''}
        label='Pool password'
        placeholder='Write pool password'
      />
    </div>
  )
}