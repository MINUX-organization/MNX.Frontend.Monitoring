import { useModal } from "@/shared/lib/hooks/modal";
import { UiModal } from "@/shared/ui/ui-modal";
import { createContext, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { PresetsList } from "./presets-list";

import styles from './presetModal.module.scss';
import { PresetParametersGpu } from "./preset-parameters/preset-parameters-gpu";
import { Preset, usePresetRepository } from "@/entities/preset";
import { PresetParametersConfig } from "./preset-parameters";
import { SliderParameter } from "@/shared/types/slider-types";
import _ from "lodash";
import { usePresetStateStore } from "../model";
import { useGpusListQuery } from "@/entities/devices/gpu";
import { State } from "../model/preset-state.store";

export const PresetModalContext = createContext({
  value: {} as SliderParameter,
  setValue: (_value: SliderParameter) => {},
});

export function PresetModal() {
  const { isOpen, onOpen } = useModal();
  const { getPresetsList } = usePresetRepository();
  const { data: gpusList } = useGpusListQuery();
  const { setPreset, setGpuName, selectedPreset, selectedGpuName, setModalState } = usePresetStateStore();
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams  = new URLSearchParams(location.search)
  const gpuId = queryParams.get('gpuId') ?? undefined;
  const presetId = queryParams.get('presetId') ?? undefined;
  
  const getSelectedPreset = useCallback(() => 
    _.find(getPresetsList(), ['id', presetId]), [getPresetsList(), presetId]);

  const getSelectedGpuName = useCallback(() => 
    _.find(gpusList, ['id', gpuId])?.name, [gpuId]);

  useEffect(() => {
    setPreset(getSelectedPreset());

    if (gpuId) setGpuName(getSelectedGpuName())
    else setGpuName(getSelectedPreset()?.gpuName);

    if (!presetId && !gpuId) setModalState(State.Creating); 
  }, [getSelectedPreset, gpuId]);

  useEffect(() => {
    if (presetId) setModalState(State.Editing);
  }, [])

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <UiModal isOpen={isOpen.value} onClose={() => navigate('..')}>
      <div className={styles['preset-modal']}>
          <RenderParameters 
            className={styles['parameters']}
            selectedGpuName={selectedGpuName}
            selectedPreset={selectedPreset} 
            presetId={presetId} 
            gpuId={gpuId}
          />
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
  if (gpuId) return <PresetParametersGpu className={className} gpuId={gpuId}/>

  if ((presetId && selectedPreset) || !_.isEmpty(selectedGpuName)) 
    return <PresetParametersConfig className={className} selectedPreset={selectedPreset}/>

  return <></>
}