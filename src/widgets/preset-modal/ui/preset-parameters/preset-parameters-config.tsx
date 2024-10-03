import { UiBorderBox } from '@/shared/ui/ui-border-box';
import styles from './presetParametersConfig.module.scss';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';
import { SliderParameters } from './slider-parameters';
import { Preset, usePresetRepository } from '@/entities/preset';
import { getGpuRestrictions } from '@/shared/api/get/getGpuRestrictions';
import _ from 'lodash';
import { useQuery } from 'react-query';
import { useSliderStates } from '../../utils/useSlidersStates';
import { GpuRestrictions } from '@/entities/devices/gpu';
import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import { PresetModalContext } from '../preset-modal';
import clsx from 'clsx';
import { UiButton } from '@/shared/ui/ui-button';
import { usePresetStateStore } from '../../model';
import { State } from '../../model/preset-state.store';

const gpuRestrictionsMock: GpuRestrictions = {
  power: {
    minimal: 0,
    maximal: 100,
    isWritable: true,
    default: 50
  },
  fanSpeed: {
    minimal: 0,
    maximal: 100,
    isWritable: true,
    default: 50
  },
  temperature: {
    core: {
      minimal: 0,
      maximal: 100,
      isWritable: true,
      default: 50
    },
    memory: {
      minimal: 0,
      maximal: 100,
      isWritable: true,
      default: 50
    }
  },
  voltage: {
    core: {
      lock: {
        minimal: 0,
        maximal: 100,
        isWritable: true,
        default: 50
      },
      offset: {
        minimal: -50,
        maximal: 50,
        isWritable: true,
        default: 0
      }
    },
    memory: {
      lock: {
        minimal: 0,
        maximal: 100,
        isWritable: true,
        default: 50
      },
      offset: {
        minimal: -50,
        maximal: 50,
        isWritable: true,
        default: 0
      }
    }
  },
  clock: {
    core: {
      lock: {
        minimal: 0,
        maximal: 100,
        isWritable: true,
        default: 50
      },
      offset: {
        minimal: -50,
        maximal: 50,
        isWritable: true,
        default: 0
      }
    },
    memory: {
      lock: {
        minimal: 0,
        maximal: 100,
        isWritable: true,
        default: 50
      },
      offset: {
        minimal: -50,
        maximal: 50,
        isWritable: true,
        default: 0
      }
    }
  }
}

export function PresetParametersConfig({
  className,
  selectedPreset,
} : {
  className?: string;
  selectedPreset?: Preset;
}) {
  const { setSlidersParameters, modalState } = usePresetStateStore();

  const { data } = useQuery(['gpuRestrictions'], () => getGpuRestrictions(selectedPreset?.gpuName ?? ''));

  // if (!data) return <></>;

  const { reset, ...states } = useSliderStates(gpuRestrictionsMock, selectedPreset);
  const depth = _.flatten(_.map(states, (item) => _.map(item, (item) => item.value)));

  const debouncedSetValue = useRef(_.debounce((newValue) => {
    setSlidersParameters(newValue);
  }, 500)).current;
  
  useEffect(() => {
    debouncedSetValue(states);
  }, [...depth, debouncedSetValue]);

  const isDisabled = modalState === State.Idle;

  return (
    <UiBorderBox className={clsx(styles['preset-parameters-config'])}>
      <UiBgContainer className={clsx(className, styles['preset-parameters-container'])} color="opaque">
        <SliderParameters isDisabled={isDisabled} data={states.clocking} className={styles['slider-parameters']} label="Clocking" />
        <SliderParameters isDisabled={isDisabled} data={states.voltage} label="Voltage" />
        <SliderParameters isDisabled={isDisabled} data={states.other} label="Other" />
        {modalState !== State.Idle && <UiButton 
          className={styles['reset-button']} 
          onClick={reset}
          color='red'
          withBorder
        >
          Reset
        </UiButton>}
      </UiBgContainer>
    </UiBorderBox>
  )
}