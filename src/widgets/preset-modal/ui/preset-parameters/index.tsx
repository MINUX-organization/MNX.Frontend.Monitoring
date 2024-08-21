import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";

import styles from './index.module.scss';
import { CurrentParameters } from "./current-parameters";
import { SliderParameters } from "./slider-parameters";

export default function PresetParameters({
  gpuId
} : {
  gpuId?: string;
}) {
  const presetName = 'preset-123';
  const gpuName = 'Nvidia RTX 3080 Ti';
  const ven = 'Samsung GDDR6';

  return (
    <UiBorderBox className={styles['preset-parameters']}>
      <UiBgContainer className={styles['preset-parameters-container']} color="opaque">
        <div className={styles['preset-header']}>
          <div className={styles['preset-header-item']}>
            <span className={styles['blue']}>Index:&nbsp;</span>
            <span>{gpuId}</span>
            <br/>
            {presetName && (<span className={styles['blue']}>{presetName}</span>)}
          </div>
          <div className={styles['preset-header-item']}>
            <span>{gpuName}</span>
            <br/>
            <span className={styles['gray']}>{ven}</span>
          </div>
          <div className={styles['preset-header-item']}/>
        </div>
        <CurrentParameters />
        <SliderParameters label="Clocking" />
        <SliderParameters label="Voltage" />
        <SliderParameters label="Other" />
      </UiBgContainer>
    </UiBorderBox>
  )
}