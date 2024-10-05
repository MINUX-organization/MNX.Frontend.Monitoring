import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";

import styles from './presetParametersGpu.module.scss';
import { CurrentParameters } from "./current-parameters";
import { SliderParameters } from "./slider-parameters";
import { PresetCard } from "./preset-card";
import clsx from "clsx";

export function PresetParametersGpu({
  gpuId,
  className
} : {
  gpuId?: string;
  className?: string;
}) {
  return (
    <UiBorderBox className={styles['preset-parameters-gpu']}>
      <UiBgContainer className={clsx(className, styles['preset-parameters-container'])} color="opaque">
        <PresetCard gpuId={gpuId}/>
        <CurrentParameters />
        <SliderParameters label="Clocking" />
        <SliderParameters label="Voltage" />
        <SliderParameters label="Other" />
      </UiBgContainer>
    </UiBorderBox>
  )
}