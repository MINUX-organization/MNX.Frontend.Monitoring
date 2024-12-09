import { UiInput } from "@/shared/ui/ui-input";
import styles from './namePart.module.scss';
import { UiSwitch } from "@/shared/ui/ui-switch";
import { Control } from "react-hook-form";
import { FormInput } from "../flightsheet-modal";
import { StateObject } from "@/shared/lib/utils/state-object";

export function NamePart({
  control,
  gpuTarget,
  cpuTarget,
} : {
  control: Control<FormInput, any, FormInput>
  gpuTarget: StateObject<boolean>,
  cpuTarget: StateObject<boolean>,
}) {
  return (
    <div className={styles['name-part']}>
      <UiInput 
        className={styles['name-input']} 
        control={control} 
        value={''}
        name="name" 
        label="Flight sheet name"
        placeholder="Write name" 
      />
      <div className={styles['targets-container']}>
        <span>Target</span>
        <div className={styles['targets']}>
          <div className={styles['target']}>
            <UiSwitch checked={gpuTarget.value} setChecked={gpuTarget.setValue}/>
            <span className={styles['text']}>GPU</span>
          </div>
          <div className={styles['target']}>
            <UiSwitch checked={cpuTarget.value} setChecked={cpuTarget.setValue}/>
            <span className={styles['text']}>CPU</span>
          </div>
        </div>
      </div>
    </div>
  )
}