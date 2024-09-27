import { useModal } from "@/shared/lib/hooks/modal";
import { UiModal } from "@/shared/ui/ui-modal";
import { createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { PresetsList } from "./presets-list";

import styles from './presetModal.module.scss';
import { PresetParametersGpu } from "./preset-parameters/preset-parameters-gpu";
import { usePresetRepository } from "@/entities/preset";
import { PresetParametersConfig } from "./preset-parameters";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { SliderParameter } from "@/shared/types/slider-types";

export const PresetModalContext = createContext({
  value: {} as SliderParameter,
  setValue: (_value: SliderParameter) => {},
});

export function PresetModal() {
  const { isOpen, onOpen } = useModal();
  const { getPresetsList } = usePresetRepository();
  const location = useLocation();
  const navigate = useNavigate();

  const preset = useStateObject<SliderParameter>();
  
  const queryParams  = new URLSearchParams(location.search)
  const gpuId = queryParams.get('gpuId') ?? undefined;
  const presetId = queryParams.get('presetId') ?? undefined;

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <UiModal isOpen={isOpen.value} onClose={() => navigate('..')}>
      <div className={styles['preset-modal']}>
        <PresetModalContext.Provider value={{ value: preset.value, setValue: preset.setValue}}>
          <RenderParameters className={styles['parameters']} presetId={presetId} gpuId={gpuId}/>
          <PresetsList
            className={styles['parameters']}
            presetsList={getPresetsList()}
            gpuId={gpuId} 
            selectedPresetId={presetId}
          />
        </PresetModalContext.Provider>
      </div>
    </UiModal>
  )
}

const RenderParameters = ({
  gpuId,
  presetId,
  className,
} : {
  gpuId?: string;
  presetId?: string;
  className?: string;
}) => {
  if (gpuId) return <PresetParametersGpu className={className} gpuId={gpuId}/>

  if (presetId) return <PresetParametersConfig className={className} presetId={presetId}/>
  
  return <></>
}