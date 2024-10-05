import _ from "lodash";
import styles from './presetModal.module.scss';
import { useModal } from "@/shared/lib/hooks/modal";
import { UiModal } from "@/shared/ui/ui-modal";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { PresetsList } from "./presets-list";
import { PresetParametersGpu } from "./preset-parameters/preset-parameters-gpu";
import { Preset, usePresetRepository } from "@/entities/preset";
import { PresetParametersConfig } from "./preset-parameters";
import { usePresetStateStore } from "../model";
import { GpuRestrictions, useGpusListQuery } from "@/entities/devices/gpu";
import { State } from "../model/preset-state.store";
import { getGpuRestrictions } from "@/shared/api/get/getGpuRestrictions";
import { useQuery } from "react-query";
import { PRODUCTION_MODE } from "@/shared/constants/production-mode";

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

export function PresetModal() {
  const { isOpen, onOpen } = useModal();
  const { getPresetsList } = usePresetRepository();
  const { data: gpusList } = useGpusListQuery();
  const { 
    setPreset,
    setGpuName,
    selectedPreset,
    selectedGpuName,
    setModalState 
  } = usePresetStateStore();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams  = new URLSearchParams(location.search)
  const gpuId = queryParams.get('gpuId') ?? undefined;
  const presetId = queryParams.get('presetId') ?? undefined;
  
  const getSelectedPreset = useMemo(() => 
    _.find(getPresetsList(), ['id', presetId]), [presetId]);

  const getSelectedGpuName = useMemo(() => 
    _.find(gpusList, ['id', gpuId])?.name, [gpuId]);

  useEffect(() => {
    if (getSelectedPreset) setPreset(getSelectedPreset);

    if (gpuId) setGpuName(getSelectedGpuName)
    else setGpuName(getSelectedPreset?.gpuName);

    if (!presetId && !gpuId) setModalState(State.Creating); 
  }, [getSelectedPreset, gpuId]);

  useEffect(() => {
    if (presetId) setModalState(State.Editing);
  }, [])

  useEffect(() => {
    onOpen();

    return () => {
      setPreset(undefined);
      setGpuName(undefined);
      setModalState(State.Idle);
    }
  }, []);

  return (
    <UiModal isOpen={isOpen.value} onClose={() => navigate('..')}>
      <div className={styles['preset-modal']}>
          {!_.isEmpty(selectedGpuName) && <RenderParameters 
            className={styles['parameters']}
            selectedGpuName={selectedGpuName}
            selectedPreset={selectedPreset} 
            presetId={presetId} 
            gpuId={gpuId}
          />}
          <PresetsList
            className={styles['parameters']}
            gpuId={gpuId}
          />
      </div>
    </UiModal>
  )
}

const RenderParameters = ({
  gpuId,
  presetId,
  className,
  selectedPreset,
  selectedGpuName
} : {
  gpuId?: string;
  presetId?: string;
  className?: string;
  selectedPreset?: Preset;
  selectedGpuName?: string;
}) => {
  const { data: gpuRestrictions } = useQuery(['gpuRestrictions'], () => getGpuRestrictions(selectedGpuName ?? ''));

  const data_mock = PRODUCTION_MODE ? gpuRestrictions : gpuRestrictionsMock

  const haseData = presetId && selectedPreset && data_mock;
  const haseGpuData = selectedGpuName && data_mock;

  if (gpuId) return <PresetParametersGpu className={className} gpuId={gpuId}/>

  if (haseData || haseGpuData)
    return <PresetParametersConfig 
      className={className} 
      gpuRestrictions={data_mock} 
      selectedPreset={selectedPreset}/>

  return <></>
}