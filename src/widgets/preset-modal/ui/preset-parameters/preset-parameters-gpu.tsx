import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './presetParametersGpu.module.scss';
import { CurrentParameters } from "./current-parameters";
import { SliderParameters } from "./slider-parameters";
import { PresetCard } from "./preset-card";
import clsx from "clsx";
import { GpuRestrictions, useGpuOverclockingQuery } from "@/entities/devices/gpu";
import { usePresetStateStore } from "../../model";
import _ from "lodash";
import { useSliderStates } from "../../utils/useSlidersStates";
import { useEffect, useRef } from "react";
import { State } from "../../model/preset-state.store";
import { UiButton } from "@/shared/ui/ui-button";
import { applyDeviceOverclockingApi } from "@/shared/api/post/applyDeviceOverclocking";
import { Overclocking } from "@/entities/preset";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";

export function PresetParametersGpu({
  gpuId,
  className,
  gpuRestrictions
} : {
  gpuId: string;
  className?: string;
  gpuRestrictions: GpuRestrictions;
}) {
  const { setSlidersParameters, modalState, setModalState } = usePresetStateStore();
  const { data: overclocking } = useGpuOverclockingQuery(gpuId);

  const { reset, ...states } = useSliderStates(gpuRestrictions, overclocking);
  const depth = _.flatten(_.map(states, (item) => _.map(item, (item) => item.value)));

  const debouncedSetValue = useRef(_.debounce((newValue) => {
    setSlidersParameters(newValue);
  }, 500)).current;

  const handleApply = async () => {
    const mapped: unknown = _.reduce(states, (acc: { [key: string]: number }, values) => {
        _.forEach(values, (value) => {
            acc[_.camelCase(value.label)] = value.value ?? value.default;
        });
        return acc;
      }, {});

    const overclocking: Overclocking = {
      $type: 'GPU',
      ...mapped as Omit<Overclocking, '$type'>
    }

    const status = await applyDeviceOverclockingApi(overclocking, gpuId);

    if (IS_SUCCESS_STATUS(status)) {
      setModalState(State.Gpu);
    }
  }
  
  useEffect(() => {
    debouncedSetValue(states);
  }, [...depth, debouncedSetValue]);

  useEffect(() => {
    setModalState(State.Gpu);
  }, [])

  const isDisabled = modalState === State.Idle;

  return (
    <UiBorderBox className={styles['preset-parameters-gpu']}>
      <UiBgContainer className={clsx(className, styles['preset-parameters-container'])} color="opaque">
        <PresetCard gpuId={gpuId}/>
        <CurrentParameters />
        <SliderParameters isDisabled={isDisabled} data={states.clocking} label="Clocking" />
        <SliderParameters isDisabled={isDisabled} data={states.voltage} label="Voltage" />
        <SliderParameters isDisabled={isDisabled} data={states.other} label="Other" />
        {modalState === State.Gpu && <div className={styles['buttons']}>
          <UiButton 
            className={styles['apply-button']} 
            onClick={handleApply}
            color='blue'
            withBorder
          >
            Apply
          </UiButton>
          <UiButton 
            className={styles['reset-button']} 
            onClick={reset}
            color='red'
            withBorder
          >
            Reset
          </UiButton>
        </div>}
      </UiBgContainer>
    </UiBorderBox>
  )
}