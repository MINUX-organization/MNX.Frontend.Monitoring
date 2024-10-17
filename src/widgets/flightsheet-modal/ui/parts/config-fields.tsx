import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { FormInput } from "../flightsheet-modal";
import { UiComboBox } from "@/shared/ui/ui-combobox";
import { UiInput } from "@/shared/ui/ui-input";
import { Wallet } from "@/entities/wallet";
import { Pool } from "@/entities/pool";
import styles from './configFields.module.scss';

export function ConfigFields({
  className,
  control,
  fields,
  index,
  coins,
  wallets,
  pools,
  type,
} : {
  className?: string;
  control: Control<FormInput, any, FormInput>;
  fields: FieldArrayWithId<FormInput, "target", "id">[]
  coins?: Crypto[];
  wallets?: Wallet[];
  pools?: Pool[];
  index: number;
  type: 'CPU' | 'GPU';
}) {
  return (
    <div className={styles['fields']}>
      <Controller
        control={control}
        name={`target.0.configs.${index}.coin`}
        render={({ field : { onChange } }) => (
          <UiComboBox
            className={className}
            options={coins ?? [{name: "wwww"}, {name: "2222"}]}
            title={`${type} Coin`}
            getOptionLabel={(option) => option?.name ?? ''}
            selectedOption={fields[0]?.configs[index]?.coin}
            placeholder="Select wallet"
            selectedOnChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name={`target.0.configs.${index}.wallet`}
        render={({ field : { onChange } }) => (
          <UiComboBox 
            className={className}
            options={wallets ?? [{name: "wwww"}, {name: "11111"}]}
            title={`${type} Wallet`}
            getOptionLabel={(option) => option?.name ?? ''}
            selectedOption={fields[0]?.configs[index]?.wallet}
            placeholder="Select wallet"
            selectedOnChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name={`target.0.configs.${index}.pool`}
        render={({ field : { onChange } }) => (
          <UiComboBox
            className={className}
            options={pools ?? [{domain: "wwww"}, {domain: "11111"}]}
            title={`${type} Pool`}
            getOptionLabel={(option) => option?.domain ?? ''}
            selectedOption={fields[0]?.configs[index]?.pool}
            placeholder="Select pool"
            selectedOnChange={onChange}
          />
        )}
      />
      <UiInput
        className={className}
        control={control}
        name={`target.0.configs.${index}.poolPassword`}
        label='Pool password'
        placeholder='Write pool password'
      />
    </div>
  )
}