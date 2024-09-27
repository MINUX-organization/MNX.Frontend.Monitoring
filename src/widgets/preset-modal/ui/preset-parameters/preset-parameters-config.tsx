import { UiBorderBox } from '@/shared/ui/ui-border-box';
import styles from './presetParametersConfig.module.scss';
import { UiBgContainer } from '@/shared/ui/ui-bg-container';
import { SliderParameters } from './slider-parameters';
import { usePresetRepository } from '@/entities/preset';
import { getGpuRestrictions } from '@/shared/api/get/getGpuRestrictions';
import _ from 'lodash';
import { useQuery } from 'react-query';
import { useSliderStates } from '../../utils/useSlidersStates';
import { GpuRestrictions } from '@/entities/devices/gpu';
import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import { PresetModalContext } from '../preset-modal';
import clsx from 'clsx';
import { UiButton } from '@/shared/ui/ui-button';

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
  presetId,
  className
} : {
  presetId?: string;
  className?: string;
}) {
  const { getPresetsList } = usePresetRepository();
  const { setValue } = useContext(PresetModalContext);
  const preset = _.find(getPresetsList(), ['id', presetId]);
  const { data } = useQuery(['gpuRestrictions'], () => getGpuRestrictions(preset?.gpuName ?? ''));

  if (!preset) return <></>;
  // if (!data) return <></>;

  const { reset, ...states } = useSliderStates(gpuRestrictionsMock, preset);
  const depth = _.flatten(_.map(states, (item) => _.map(item, (item) => item.value)));

  const debouncedSetValue = useRef(_.debounce((newValue) => {
    setValue(newValue);
  }, 500)).current;
  
  useEffect(() => {
    debouncedSetValue(states);
  }, [...depth, debouncedSetValue]);

  return (
    <UiBorderBox className={styles['preset-parameters-config']}>
      <UiBgContainer className={clsx(className, styles['preset-parameters-container'])} color="opaque">
        <SliderParameters data={states.clocking} className={styles['slider-parameters']} label="Clocking" />
        <SliderParameters data={states.voltage} label="Voltage" />
        <SliderParameters data={states.other} label="Other" />
        <UiButton 
          className={styles['reset-button']} 
          onClick={reset}
          color='red'
          withBorder
        >
          Reset
        </UiButton>
      </UiBgContainer>
    </UiBorderBox>
  )
}